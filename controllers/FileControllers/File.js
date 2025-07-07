const { FileUpdate } = require("../../models/FileModels/File");
const { Op } = require("sequelize");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Updates");
  },
  filename: (req, file, cb) => {
    // Temporary filename: use timestamp + originalname
    const ext = path.extname(file.originalname);
    cb(null, `temp_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

async function deleteTable() {
  try {
    await Product.drop();
    console.log("Table deleted successfully.");
  } catch (error) {
    console.error("Error deleting table:", error);
  }
}


const CreateFile = async (req, res) => {
  const update = req.file;
  const { Version } = req.body; // get Version and Name from request body

  console.log({ Version });

  try {
    if (!update) {
      const error = new Error("Please upload a file");
      error.status = 400;
      throw error;
    }

    const safeVersion = Version.replace(/[^a-zA-Z0-9.-]/g, "_");
    const ext = path.extname(req.file.filename);
    const newFilename = `version_${safeVersion}${ext}`;
    const oldPath = path.join("public/updates", req.file.filename);
    const newPath = path.join("public/updates", newFilename);

    console.log("Uploaded file info:", update);

    // Rename the file
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        return res.status(500).json({ error: "File rename failed" });
      }
    //   res.json({ message: "File uploaded and renamed", filename: newFilename });
    });

    // Use req.file.filename which is set by multer diskStorage's filename function
    const [File, created] = await FileUpdate.findOrCreate({
      where: { Version },
      defaults: {
        Version,
        Filepath: newFilename, // use the filename saved on disk
      },
    });

    res.status(200).json({ File, created });
  } catch (error) {
    console.error("Error in findOrCreate:", error);
    res.status(error.status || 500).json({ error: error.message });
  }
};

const GetAllFile = async (req, res) => {
  try {
    // Get the latest file (most recently created)
    const latestFile = await FileUpdate.findOne({
      order: [["createdAt", "DESC"]],
      attributes: ['Version',  'Filepath']  // Select only needed fields
    });

    if (!latestFile) {
      return res.status(404).json({ error: "No update files found" });
    }

    // Construct the response in the required format
    const response = {
      version: latestFile.Version,
      notes: latestFile.releaseNotes || "Bug fixes",  // Default message if releaseNotes is empty
      downloadUrl: `http://localhost:6000/Updates/${latestFile.Filepath}`
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const UpdateFile = async (req, res) => {
  const Name = req.params.Name;

  const { Version } = req.body;

  try {
    const Getone = await FileUpdate.findOne({ where: { Name } });

   

    // console.log(">>>>>>>>>>>>>>>>>>>Product Name coming from sstock pruchase",reload)
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const DeleteFile = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await FileUpdate.destroy({
      where: { id },
      cascade: true,
    }).then((result) => {
      res.status(200).json({ message: "Record deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  CreateFile,
  upload,
  GetAllFile,
  UpdateFile,
  DeleteFile,
};
