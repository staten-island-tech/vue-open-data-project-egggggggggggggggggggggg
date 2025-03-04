function delay(ms)//Delay function utilizing promise
{
    return new Promise(resolve=>setTimeout(resolve, ms))
}

export { delay }