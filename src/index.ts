import app from './app'
import { connectDB } from './config/db';

// auth()
connectDB()

app.listen(app.get('port'));
console.log(`Listening on Server`)