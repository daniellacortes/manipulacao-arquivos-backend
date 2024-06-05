const fs = require("fs");
// const fs2 = require ("fs-extra");
const { rename } = require("fs/promises");
const { join } = require("path");
let showIndex = process.argv.indexOf("--show");
let fileName = process.argv.indexOf("--name") + 1;
let fileText = process.argv.indexOf("--text") + 1;
let fileUpdate = process.argv.indexOf("--update") + 1;
let tamanho = process.argv.length;
let removeIndex = process.argv.indexOf("--remove");
let fileLink = process.argv.indexOf("--move") + 1;
let helpIndex = process.argv.indexOf("--help");
let newName = process.argv.indexOf("--newName") + 1;
let renameFolder = process.argv.indexOf("--folder") + 1;

if (fileName == 0) {
  fileName == null;
} else {
  fileName = process.argv[fileName];
}
if (fileText == 0) {
  fileText = null;
} else {
  fileText = process.argv[fileText];
}

if (fileUpdate == 0) {
  fileUpdate = null;
} else {
  fileUpdate = process.argv[fileUpdate];
}
if (fileLink == 0) {
  fileLink == null;
} else {
  fileLink = process.argv[fileLink];
}
if (newName == 0) {
  newName == null;
} else {
  newName = process.argv[newName];
}
if (renameFolder == 0) {
  renameFolder == null;
} else {
  renameFolder = process.argv[renameFolder];
}

function options() {
  console.log(
    "Atenção! Comandos aceitos:\n\n--name: nome do arquivo com extensão\n--show: mostrar conteúdo do arquivo\n--text: conteúdo do arquivo a ser criado\n--update: conteúdo do arquivo a ser alterado\n--remove: remove o arquivo\n--move: caminho para mover o arquivo\n\nSempre digite primeiro o nome do arquivo!\n"
  );
}

async function getFile() {
  const data = await fs.promises.readFile("./" + fileName);
  return data.toString();
}

async function moveFile(from, to) {
  try {
    await rename(from, to);
    console.log("File moved successfully");
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  if (tamanho <= 2) {
    options();
  } else if (fileName && showIndex !== -1) {
    let t = await getFile();
    console.log(t);
  } else if (fileName && fileText) {
    fs.writeFile(fileName, fileText, { flag: "a+" }, (err) => {
      if (err) throw err;
      console.log("O arquivo foi criado.");
    });
  } else if (fileName && fileUpdate) {
    fs.writeFile(fileName, fileUpdate, { flag: "r+" }, (err) => {
      if (err) throw err;
      console.log(fileUpdate);
      console.log("O arquivo foi modificado.");
    });
  } else if (fileName && removeIndex !== -1) {
    fs.unlink(fileName, function (err) {
      if (err) throw err;
      console.log("O arquivo foi removido.");
    });
  } else if (fileName && fileLink) {
    let fileNameLink = join(__dirname, fileName);
    // fileLink = join(fileLink, fileName);
    moveFile(fileNameLink, fileLink);
    // fs2.move(fileName, fileLink, (err) => {
    //   if (err) return console.log(err);
    //   console.log("O arquivo foi movido.");
    // });
  } else if (renameFolder && newName) {
    fs.readdir(renameFolder, (err, files) => {
      console.log(files);
      files.forEach((element) => {
        var extension = element.split(".");
        extension = extension[extension.length - 1];
        newName =
          newName + "-" + parseInt(element.indexOf() + 2) + "." + extension;
        let path = renameFolder + "\\" + element;
        fs.renameSync(path, newName);
      });
      extension = "";
    });
  } else if (helpIndex !== -1) {
    options();
  } else {
    console.log("--help for options");
    throw err;
  }
}

main();

//

//   case "1":
//     getFile().then((t) => console.log(t));
//     break;
//   case "2":
//     console.log("Qual será o nome do arquivo?");
//     nomeArquivo = process.argv;
//     console.log("Qual o contéudo do arquivo?");
//     conteudoArquivo = process.argv;
//
//     break;
//   case "3":
//     console.log("Qual o nome do arquivo que deseja alterar?");
//     nomeArquivo = process.argv;
//     console.log("Digite as alterações:");
//     conteudoArquivo = process.argv;
//
// }

// if (showIndex !== -1) {
// } else {
//   console.log(" --show: mostra texto do arquivo");
// }

// if (fileName !== 1 && fileName < process.argv.length - 1) {
//   fileName = process.argv[fileName + 1];
//   console.log(1, fileName);
// }

// console.log(fileText, fileText !== "-1");
// if (fileText !== 1 && fileText < process.argv.length - 1) {
//   fileText = process.argv[fileText + 1];
//   console.log(2, fileText);
// }

// if (fileName && fileText) {
// }

// if (fileUpdate !== 1 && fileUpdate < process.argv.length - 1) {
//   fileUpdate = process.argv[fileUpdate + 1];
//   console.log(fileUpdate);
// }

// // if (fileName && fileUpdate) {
// //   fs.writeFile(fileName, fileUpdate, { flag: "r+" }, (err) => {
// //     if (err) throw err;
// //     console.log("O arquivo foi modificado.");
// //   });
// // }
