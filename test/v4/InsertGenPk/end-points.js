import express from 'express';

import funcFromKeshavSoftFolderName from './KeshavSoftFolderName/controller.js';

const tableName = "StockItems";
const tablePath = "Data/StockItems.json";
const configPath = "Config/Schemas/StockItems.json";

const router = express.Router();

router.post('/insertGenPk', (req, res) => funcFromKeshavSoftFolderName({ req, res, inTablePath: tablePath }));

export { router };