import { DefaultButton, Dialog, DialogFooter, DialogType, Icon, PrimaryButton } from '@fluentui/react';
import * as React from 'react';
//import { WebPartContext } from '@microsoft/sp-webpart-base';
import { getFileTypeIconProps, initializeFileTypeIcons } from '@fluentui/react-file-type-icons';
export * from './AttachmentHelper';

initializeFileTypeIcons(undefined);

interface IAttachmentProps{
    context:any;
    viewOnlyMode:boolean;
    onChange(files:any):any;
    onDelete(files:any):any;
    existingFiles:any;
}

interface IAttachmentState
{
    filesTobeSave:any;
    fileToBeDeleted:any;
    hideDialog:boolean;
}

const actionIconProps= {root:{padding:'5px'}}

export default class AttachmentControl extends React.Component<IAttachmentProps,IAttachmentState> {
    private fileRef:HTMLInputElement;
    //private spcontext: WebPartContext;
    constructor(props:any){
        super(props);
        this.handleFileonChange = this.handleFileonChange.bind(this);
        this.removeFiles = this.removeFiles.bind(this);
        this.deleteFiles = this.deleteFiles.bind(this);
        this.showHideDialog = this.showHideDialog.bind(this);
       // this.spcontext = this.props.context;
        this.state = {
            filesTobeSave:[],
            fileToBeDeleted:[],
            hideDialog:true
        }
    }


    public handleFileonChange(e:any){
        let files = e.target.files;
        let temp = [];
        for(var i=0;i<files.length;i++){
            temp.push(files[i]);
        }
        temp = this.state.filesTobeSave.concat(temp)
        this.setState({
            filesTobeSave:temp
        })
        this.props.onChange(temp)
        this.fileRef.files = null;
    }

    public removeFiles(fileName:any){
        let temp = this.state.filesTobeSave.filter((d:any)=>d.name != fileName);
        this.setState({
            filesTobeSave:temp
        })
        this.props.onChange(temp)
    }

    public deleteFiles(file:any){        
        //const file = sp.web.getFileByUrl(this.state.fileToBeDeleted.ServerRelativeUrl).delete();
        let tempFileToBeDelete = this.state.fileToBeDeleted;
        tempFileToBeDelete.push(file);
        //let temp = this.props.existingFiles.filter((d:any)=>d.Name != file.Name)
        this.props.onDelete(tempFileToBeDelete);
        /* this.setState({
            hideDialog:true
        }) */
    }

    public showHideDialog(isHide:boolean,itemToBeAction:any){
            this.setState({
                fileToBeDeleted:itemToBeAction,
                hideDialog:isHide
            })
            
    }

    public getDocumentExtension(fileName:string):string{
        return fileName.substring(fileName.lastIndexOf(".")+1);
    }
    
    public render(): React.ReactElement<any> {
        
      
        return <div>
            <input type="file" id="file" multiple onChange={this.handleFileonChange} ref={(r:any)=>this.fileRef=r} style={{display: "none"}}/>             
            <PrimaryButton style={{display:this.props.viewOnlyMode?'none':''}} text="Add Attachment" onClick={()=>this.fileRef.click()} />
            <div style={{padding:'5px'}}>
            {this.state.filesTobeSave!=undefined?[].map.call(this.state.filesTobeSave,(file:any)=>
            <div style={{padding:'5',float:'left',marginRight:'5px'}}><PrimaryButton text={file.name}>
                <Icon iconName='RemoveLinkX' onClick={()=>this.removeFiles(file.name)}></Icon></PrimaryButton></div>):null}
            </div>
            {this.props.existingFiles != undefined?[].map.call(this.props.existingFiles,(item:any)=>{
                <div style={{padding:'5',float:'left',marginRight:'5px'}}>
                    <div>
                        <td>
                        <div>{item.Name != undefined?item.Name:item.FileName}</div><Icon role='button' styles={actionIconProps} iconName='Download'  onClick={()=>window.open(`${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/download.aspx?SourceUrl=${item.ServerRelativeUrl}`,"_self")}></Icon>
                                <Icon hidden={this.props.viewOnlyMode} role='button' styles={actionIconProps} iconName='Delete' onClick={()=>this.deleteFiles(item)}></Icon>
                        </td>
                    </div>
                    <Icon  {...getFileTypeIconProps({ extension: this.getDocumentExtension(item.Name != undefined?item.Name:item.FileName), size: 16, imageFileType: 'png' })}    ></Icon><div>{item.Name != undefined?item.Name:item.FileName}</div><Icon role='button' styles={actionIconProps} iconName='Download'  onClick={()=>window.open(`${this.props.context.pageContext.web.absoluteUrl}/_layouts/15/download.aspx?SourceUrl=${item.ServerRelativeUrl}`,"_self")}></Icon>
                                <Icon hidden={this.props.viewOnlyMode} role='button' styles={actionIconProps} iconName='Delete' onClick={()=>this.deleteFiles(item)}></Icon>
                           
                </div>
            }):null}
  
            <Dialog
                hidden={this.state.hideDialog}
                onDismiss={()=>this.showHideDialog(true,undefined)}
                dialogContentProps={{
                    type: DialogType.normal,
                    title: `Delete file ${this.state.fileToBeDeleted != undefined?this.state.fileToBeDeleted.Name:""}?`,
                    closeButtonAriaLabel: 'Close',
                // subText: 'Do you want to send this message without a subject?',
                }}
            // modalProps={modalProps}
            >
        <DialogFooter>
          <DefaultButton onClick={()=>this.showHideDialog(true,undefined)} text="Don't Delete" />
          <PrimaryButton onClick={this.deleteFiles} text="Yes,Delete" />
        </DialogFooter>
      </Dialog>
        </div>
    }

}