import express from "express";
import cors from "cors";
const app = express();
const PORT = 8000;

// cors enable the option to answer from chrome extension
app.use(cors());
app.use(express.static("public"));
let version = '1.0.0';










const urlList = [
  "https://www.facebook.com",
  "https://www.google.com"];


const predefinedRules = {"www.facebook.com": [/^https:\/\/www.facebook\.com\/login.*/, /^https:\/\/www.facebook\.com\/groups.*/],
  "www.google.com": [/^https:\/\/www.google\.com\/search.*/]
}













app.get("/check", (req, res) => { 
  res.send('Ok')
    }); 

app.post("/log-requests", express.json(), (req, res) => {
  const { url, method, type, timestamp } = req.body;
  if (toTrigger(url)){
    res.json({trigger: true})
  }
  else {
    res.json({trigger: false})
  }
});


function toTrigger(url){
  if (!predefinedRules)
    return false;
  const domain = new URL(url).hostname
  const rules_relevant = predefinedRules[domain]
  if (!rules_relevant)
    return false;
    for (const rule of rules_relevant) {

      if (rule.test(url)) {
        return true;
      }
    }
  return false;
}



app.get("/urls", (req, res) => {
  const clientVersion = req.headers["x-client-version"]; 
  if (clientVersion == version)
  {
    return res.status(304).send("No changes in version.");
    
  }

  res.json({
    urls: urlList,version: "1.0.0",
  });
});



app.listen(PORT, () => {
  console.log(`URL server running at http://localhost:${PORT}`);
});




