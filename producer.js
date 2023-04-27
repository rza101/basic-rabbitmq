const amqp = require('amqplib');

const init = async () => {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queue = 'dicoding';
    const message = 'Selamat belajar message broker!';

    // channel.assertQueue bersifat idempoten, yang berarti ia hanya akan
    // membuat channel baru bila channel yang diperiksa tidak ada. 
    // Properti durable pada options berfungsi untuk menjaga agar 
    // queue tetap tersedia ketika server message broker restart.
    await channel.assertQueue(queue, {
        durable: true,
    });

    await channel.sendToQueue(queue, Buffer.from(message));
    console.log('Pesan berhasil terkirim!');

    // delay sebelum close agar success kirim
    setTimeout(() => {
        connection.close();
    }, 1000);
};

init();