
const fs = require('fs')
const readline = require('readline');



let inputDirName;
let inputDestDirName;
let inputFileNumber;
let selectedFile;
let selectedFilePath;
let dirFiles = []

//Creating interface reference of readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//Getting Source directory name
let getSourceDirName = () => {

    rl.question('Please enter full path of source directory : ', (answer) => {

        inputDirName = answer
        if(inputDirName != '')
            console.log(`full path of source directory recieved : ${inputDirName}`);

        readDirectoryAsynchronously(inputDirName)
    });//end quest

}//end get SOurce directory

//Reading directory Asynchronously 
let readDirectoryAsynchronously = (dirName) => {
    fs.readdir(dirName, (err, file) => {
        if (err) {
            //console.log(err)
            console.log('Operation can not be performed . Source Directory is missing')
            getSourceDirName()
        } else {

            for (let x in file) {

                if (file[x].toString().indexOf('.') != -1) {
                    dirFiles.push(file[x]) //push only files not folders
                }

            }

            if(dirFiles.length == 0){
                console.log('Operation can not be performed . Source Directory is empty')
                getSourceDirName()
            }
            else{
            //go through all files of directory and display its Number as well
            for (let y in dirFiles) {
                console.log(`${y} : ${dirFiles[y]}`)
            }

            readFileNumber() //read file number 

            }

        }//end else

    })//end readdir

}// end readDirectoryAsynchronously function


//getting file number as input from user 
let readFileNumber = () => {

    rl.question('Please enter file number to be copy? ', (answer) => {

        inputFileNumber = answer

        if (inputFileNumber != '' && inputFileNumber != null && inputFileNumber != undefined && inputFileNumber < dirFiles.length) {
            selectedFile = `${dirFiles[inputFileNumber]}`
            selectedFilePath = `${inputDirName}/${dirFiles[inputFileNumber]}`
            console.log(`Selected File Name : ${selectedFile}`)
            //console.log(selectedFilePath)
            getDestinationDirName()
        }
        else {
            console.log('Operation can not be performed . There is no such number associated with any file')
            readFileNumber()
        }
    });//end quest

}//end read file number


//getting dest. directory name from user
let getDestinationDirName = () => {

    rl.question('Please enter Destination Directory? ', (answer) => {

        inputDestDirName = answer
        if(inputDestDirName != '')
            console.log(`Destination Directory recieved: ${inputDestDirName}`);

        fs.readdir(inputDestDirName, (err, file) => {
            if (err) {
                //console.log(err)
                console.log('Operation can not be performed . Destiantion Directory is missing')
                getDestinationDirName()
            } else {
                copyFile(selectedFilePath, inputDestDirName)
            }
        
        })//end readdir


        rl.close();
    });//end quest

}//end get dest directory names

/* Copying A File Using Both Read And Write Streaming Mechanism */
let copyFile = (sourcePath, destinationPath) => {
    let readStream = fs.createReadStream(sourcePath)
    let writeStream = fs.createWriteStream(`${destinationPath}/(copy) ${selectedFile}`)
    readStream.on('data', (chunk) => {
        writeStream.write(chunk)
        //console.log(chunk)
    })
    readStream.on('end', () => {
        console.log('File Read Complete')
        writeStream.end()
        console.log('File Write Complete')
    })
}


module.exports = {
    getSourceDirName: getSourceDirName
}