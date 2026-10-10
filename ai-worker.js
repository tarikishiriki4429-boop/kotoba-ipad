// AI library parsing, WASM initialization and generation stay off the UI thread.
let engine=null,busy=false;
self.onmessage=async({data})=>{
  const {id,type,payload}=data||{};
  if(busy){self.postMessage({id,error:'AI処理中です。完了してから再実行してください。'});return;}
  busy=true;
  try{
    let result;
    if(type==='init'){
      if(!self.navigator.gpu)throw new Error('この環境ではバックグラウンドAI用のWebGPUを利用できません。');
      self.postMessage({type:'progress',text:'AIライブラリを読み込んでいます…'});
      const lib=await import(payload.cdn);
      const record=lib.prebuiltAppConfig.model_list.find(r=>r.model_id===payload.model);
      if(!record)throw new Error('AIモデル設定が見つかりません。');
      const appConfig={...lib.prebuiltAppConfig,cacheBackend:'cache',model_list:[{...record,
        model:'https://huggingface.co/mlc-ai/'+payload.model+'/resolve/'+payload.revision+'/',model_lib:payload.wasm
      }]};
      let last=0;
      engine=await lib.CreateMLCEngine(payload.model,{appConfig,initProgressCallback:p=>{
        const now=Date.now();if(now-last>120 || p.progress===1){last=now;self.postMessage({type:'progress',text:p.text||'AIを準備しています…'});}
      }});
      result=true;
    }else if(type==='complete'){
      if(!engine)throw new Error('AIを準備してください。');
      // Each proofreading segment is independent; do not retain earlier conversations.
      await engine.resetChat();
      result=await engine.chat.completions.create(payload);
    }else throw new Error('不明なAI操作です。');
    self.postMessage({id,result});
  }catch(e){
    // A generation failure can leave TVM scopes or GPU state unusable. Never reuse
    // that engine; the main thread terminates this worker and retains the job.
    self.postMessage({id,error:e?.message||String(e),needsReload:type==='complete'});
  }
  finally{busy=false;}
};
