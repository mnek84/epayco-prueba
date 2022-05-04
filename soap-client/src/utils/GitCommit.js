import {getLastCommit} from "git-last-commit";


export default function getGitLastCommit() {
    return new Promise((res,rej)=>{
        getLastCommit( (err,commit) => {
            if (err)
                return rej;
            return res(commit);
        } );
    });
}
