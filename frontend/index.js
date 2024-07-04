

async function getContent(){
    try {
        const response = await fetch('https://mimos-2-0.vercel.app/produtos');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

getContent();
