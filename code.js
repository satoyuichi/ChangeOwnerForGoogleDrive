const folder_name = PropertiesService.getScriptProperties().getProperty("FOLDER_NAME");
const owner_mail_address = PropertiesService.getScriptProperties().getProperty("OWNER_MAIL_ADDRESS");
const my_mail_address = PropertiesService.getScriptProperties().getProperty("MY_MAIL_ADDRESS");

function main() {
  const folders = DriveApp.getFoldersByName(folder_name);
  
  while (folders.hasNext()) {
    let folder = folders.next();
    Logger.log(folder.getName());

    getSubFolder(folder);
  }  
}

function getSubFolder(folder) {
  let subfolders = folder.getFolders();

  if(subfolders) {
    while (subfolders.hasNext()) {
      let subfolder = subfolders.next();
      getSubFolder(subfolder);
      changeOwner(subfolder, owner_mail_address);
    }
  }
}

function changeOwner(folder, owner) {
  if (folder.getOwner().getEmail() === my_mail_address) {
    Logger.log(folder.getName());
    folder.setOwner(owner);
  }

  let files = folder.getFiles();
  while (files.hasNext()) {
    let file = files.next();
    if (file.getOwner().getEmail() === my_mail_address) {
      Logger.log(file.getName());
      file.setOwner(owner);
    }
  }
}
