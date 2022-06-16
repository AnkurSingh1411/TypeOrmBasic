import { getRepository } from "typeorm"
import { Tweet } from "./entity/Tweet";
import { User } from "./entity/User"

export const Bootstrap = async ()=>{
const userRepo = getRepository(User);
const user = userRepo.create({firstName : "Mark", lastName : "Zuckerberg", age : 39})
await userRepo.save(user).catch((err)=>{
    console.log("error is : ",err);
});
console.log("New User",user);


/// tweets

const tweetRepo = getRepository(Tweet);
const tweet = new Tweet();
tweet.title = "this is tweet title";
tweet.content = "this is the content of the tweet";
tweet.user= Promise.resolve(user);

await tweetRepo.save(tweet).catch((error)=>{console.log(error)});

};

export const find = async()=>{
    const userRepo = getRepository(User);
    const user = await userRepo.findOne({where : { firstName : "Mark" }}).catch((error)=>console.log(error))
    if(user){
      console.log("User: ",user,await user.tweets);
    }
}
