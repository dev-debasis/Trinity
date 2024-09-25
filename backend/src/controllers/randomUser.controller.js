import fs from "fs";
import { parse } from "fast-csv";
import faker from "faker";
import path from "path";

exports.generateRandomUsers = (req, res) => {
    const { count } = req.body;
    const csvPath = path.join(__dirname, '../../public/temp/users.csv');

    const users = [];
    for (let i = 0; i < count; i++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumber(),
        });
    }

    const csvStream = fs.createWriteStream(csvPath);
    parse.write(users, { headers: true }).pipe(csvStream);

    csvStream.on('finish', () => {
        res.status(200).json({ message: "User data generated successfully", path: csvPath });
    });
};
