

async function getContent(){
    try {
        const response = await fetch('http://localhost:3000/produtos');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error)
    }
}

getContent();