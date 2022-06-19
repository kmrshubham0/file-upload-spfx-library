# file-upload-spfx-library

> Made with Fluent UI control

[![NPM](https://img.shields.io/npm/v/file-upload-spfx-library.svg)](https://www.npmjs.com/package/file-upload-spfx-library) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save file-upload-spfx-library
```

## Usage

```tsx


import AttachmentControl,{saveFilesToLibrary,savingFiles,deleteFiles} from 'file-upload-spfx-library';


//To render the upload control
class Example extends Component {
  render() {
    return <AttachmentControl context={this.props.context} existingFiles={this.state.ExistingFile} viewOnlyMode={this.state.IsEditMode} onChange={(file)=>this.onFileChange(file)} onDelete={(file)=>this.onDelete(file)}></AttachmentControl>
  }
}

//to save the file to library/list use helper 
saveFilesToLibraryList(files:any,listName:string,context:any,itemID:number,IsFileAsAttachment:boolean,destinationPath:string).then(()=>{

})


//to store selected file use function like this
private onFileChange = (file)=>{
  this.setState({
    Files:file
  })
}

//to store selected file use function like this
private onDeleteFile = (file)=>{
  this.setState({
    FilesToBeDelete:file
  })
}
```

## License

MIT © [](https://github.com/)

git remote add origin https://github.com/kmrshubham0/file-upload-spfx-library.git # Sets the new remote for the local repo
git add .
git commit -m 'Initial Commit'
git push -u origin main  # Pushes the changes to the remote repository
