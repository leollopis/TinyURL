import * as redis from 'redis';
import { NextApiRequest, NextApiResponse } from 'next'
import ShortUniqueId from "short-unique-id";

async function tinyURL(url : string) {

  let nbCharNeeded = 4;

  const uid = new ShortUniqueId();
  let shortUrl = uid.randomUUID(nbCharNeeded);

  while(await client.get(shortUrl)) {
    nbCharNeeded++;
    shortUrl = uid.randomUUID(nbCharNeeded);
  }

  let keyData = {
    longUrl: url,
    shortUrl: shortUrl,
    newUrl: `http://localhost:3000/${shortUrl}`
  };
  await client.set(shortUrl, url);
  return keyData;

}

const client = redis.createClient({
  url: 'redis://default:redispw@127.0.0.1:32768'
});

client.connect()
  .then(() => {
    console.log('Connected to Redis');
    async function getURL() {
      const url = await client.get("name");
      console.log(url);
    }

  });

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  // Return an empty response with a 200 OK status
  // res.status(200).json(req.body)

  if (req.method === 'POST') {
    // Handle POST request
    let result = await tinyURL(req.body.longUrl);
    console.log("result : ", result);
    
    res.status(200).json(result.newUrl); 
  }

}