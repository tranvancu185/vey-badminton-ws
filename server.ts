import app from './src/app'

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}\n URL: http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
    server.close(() => {
        console.log('EXIT SERVER EXPRESS !!!');
    });
})