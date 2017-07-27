### A NodeJS, Express, and MongoDB URL Shortening Service

To satisfy the uniqueness requirement, I'll leverage a special class of functions called bijective functions, which guarantee a 1-to-1 mapping. For purpose of this project a bijective function basically says:

* A long URL is mapped to exactly one key, and a key is mapped to exactly one long URL 

I will be using base encoding/decoding as a bijective function, specifically base58. I will convert a unique integer ID (which is in base10) to it's equivalent in base58. The base58 alphabet is:
```
123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ
```
It is just the numbers 1-9, a-z, and A-Z, giving a total of 58 characters, hence the 58 in base58. I'm are excluding 0, l, O to avoid confusion when sharing the URL over the phone or copying it manually.

Now to put it all together to generate a shorter URL, I need to:

* Create a global auto incremented integer
* Every time a new URL is shortened and added to our database, we'll increment that global number (base 10) and use     it as our unique ID for that entry in the DB
* Base58 encode that unique ID to generate a unique, shorter URL
* For example: An entry with the unique ID 10002 (base 10) will result in a base58 encoding of 3Ys. So if you store     a lot of URLs, say 100,000,000, that would
* generate a shortened hash: 9QwvW

* Taking long URLs submitted by the user via the front end
* Storing it in the database using the models we created in the previous section
* Encoding the _id of the newly inserted object
* Returning the shortened version of the URL to the user

* Check if the URL has already been shortened to avoid creating duplicates:
    * If it has been shortened, return the base58 encoded ID right away
    * If it hasn't been shortened, we will create a new entry for it