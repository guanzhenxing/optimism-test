# optimism-test

## Steps
 
### Step 1: Install dependencies

```shell
yarn
```

### Step 2: Update .env
 
put your privateKey to `.env` . Change PRIVATE_KEY=`YOUR_PRIVATE_KEY`

### Step 3: Run Test

```shell
./scripts/run.sh
```

`runBlockNumberTest()` will work, but `runBlockNumberTest1()` will error.
Difference is `compareAndUpdateUserState()` function.

