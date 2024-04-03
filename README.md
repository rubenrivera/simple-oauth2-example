## Modification

1. I added a `.env` file to save the Stack Overflow client id, client secret. 
2. dded `.gitignore` to prevent pushing this file.
3. Added the other OAuth providers to `.gitignore` to keep the GitHub repo as a **MCVE**.
4. Edited the README.md

### Stack Overflow as OAuth Provider

Documentation: https://api.stackexchange.com/docs/authentication.

#### Summary

1. Register an OAuth app authentication client on https://stackapps.com.
2. From the above listing geth the client id, client secret and key.
    - Stack Overflow / Stack Exchange API requests optionally can include a key to get higher requests quotas. 
    - I added this key to the .env file, but this is not compulsory.
3. You might want to make a copy of the examples directory of https://github.com/lelylan/simple-oauth2
4. Look at the included files for OAuth providers, choose one, make a copy and adapt it.
   - I called the file stackoverflow.js
5. Edit `package.json` to add a script command for your the Stack Overflow file.

#### Stack Overflow (error)

6. If you haven't edited the `catch` clause, It's very likely that you will get `Access Token Error The content-type is not JSON compatible` mesasge in the terminal.

#### Stack Oveflow (workaround)

As a workadound I added the new directory with two files. The directory name is `stackoverflow-fetch`and the file names are `index.js` and `authentication.js`. 
I used Node.js **fetch** instead of **getToken** method from **simple-oauth2**. Requires Node.js version 18 or greater.

# simple-oauth examples directory

Below is the content from the simple-oauth2's example directory

---

## Examples

Before running any example, please set the following environment variables:

```bash
export CLIENT_ID="your client id"
export CLIENT_SECRET="your client secret"
```

The following authorization services are provided as examples to get a better idea of how to use this library on some of the most common use cases:


### Microsoft

Microsoft requires the credentials information during the token exchange to be sent at the request body. It also requires to send the **redirect_uri** argument. See the `./microsoft.js` module as a reference implementation or execute the example with:

```bash
npm run start:microsoft
```

### Github

See the `./github.js` module as a reference implementation or execute the example with:

```bash
npm run start:github
```

### Dropbox

See the `./dropbox.js` module as a reference implementation or execute the example with:

```bash
npm run start:dropbox
```
