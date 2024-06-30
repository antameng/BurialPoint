export default function error(send) {
    window.addEventListener('error', (error) => {
        console.log(error,'报错');
        send(error)
    })

}
