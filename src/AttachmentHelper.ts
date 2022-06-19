import { ISPHttpClientOptions, SPHttpClient } from "@microsoft/sp-http";

export const  saveFilesToLibraryList=(files:any,listName:string,context:any,itemID:number,IsFileAsAttachment:boolean,destinationPath:string):Promise<any>=>{
    return new Promise(async (resolve, reject) => {
    let requests = [];
    let file;
    if(files.length > 0){
      for(var i=0;i<files.length;i++){
        file = files[i];        
        requests.push(savingFiles(file,listName,context,itemID,IsFileAsAttachment,destinationPath));
      }
  }
  Promise.all(requests).then((data)=>{
    resolve(data);
  }).catch((ex)=>{
    reject("Error:"+ex);
  })
});
}



export const savingFiles = async (file:any,listName:string,context:any,itemID:number,IsFileAsAttachment:boolean,destinationPath:string):Promise<any>=>{
  return await new Promise(async (resolve, reject) => {debugger;
    let url;
    if(IsFileAsAttachment){
      url = context.pageContext.web.absoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/Items(${itemID})/AttachmentFiles/add(FileName='` + file.name +`')`
    }else{
     let targetUrl = context.pageContext.web.serverRelativeUrl + "/" + destinationPath;
     url = context.pageContext.web.absoluteUrl + "/_api/Web/GetFolderByServerRelativeUrl(@target)/Files/add(overwrite=true, url='" + file.name + "')?@target='" + targetUrl + "'&$expand=ListItemAllFields";  
    }
    let spOpts : ISPHttpClientOptions  = {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: file       
    };
   await context.spHttpClient.post(url,SPHttpClient.configurations.v1,spOpts)
    .then((response: any) => 
    {
      if (response.ok) {  
        response.json().then((responseJSON:any) => {  
            if (responseJSON!=null && responseJSON.value!=null){  
               resolve(responseJSON.value);  
            }  
        });  
    } 
    }).catch((ex:any)=>{
      reject("Error:"+ex);
    });
});
}

export const deleteFiles=(context:any,files:any,listName:string,IsFileAsAttachment:boolean,itemID:number):Promise<any>=>{
  return new Promise((resolve, reject) => {
  let requests = [];
  let file;
  let url;
  if(files.length > 0){
    for(var i=0;i<files.length;i++){
      file = files[i]; 
      if(IsFileAsAttachment){       
      url = context.pageContext.web.webAbsoluteUrl + `/_api/web/lists/GetByTitle('${listName}')/GetItemById(${itemID})/AttachmentFiles/getByFileName('${file.FileName}')`; 
      }else{
        url = context.pageContext.web.webAbsoluteUrl  + `/_api/web/GetFileByServerRelativeUrl('${file.ServerRelativeUrl}')`;
      }
      let spOpts : ISPHttpClientOptions  = {
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
          'X-HTTP-Method': 'DELETE'
        }      
      };
      requests.push(context.spHttpClient.post(url,SPHttpClient.configurations.v1,spOpts)
      .then((response: any) => 
      {
        resolve(response.json());
      }).catch((ex:any)=>{
        reject("Error:"+ex);
      }));
    }
}
Promise.all(requests).then((data)=>{
  resolve(data);
}).catch((ex)=>{
  reject("Error"+ex);
})
});
}

export const dateValueAccess = (spDate:any) =>{
  var dt = new Date(spDate);
  return (dt.getDate()>=10?dt.getDate():"0"+dt.getDate()) + "-" + (dt.getMonth()>8?(dt.getMonth()+1):"0"+dt.getMonth()+1) + "-" + dt.getFullYear()+", "+(dt.getHours()>9?dt.getHours():"0"+dt.getHours())+":"+(dt.getMinutes()>9?dt.getMinutes():"0"+dt.getMinutes());
}