import fs from "fs/promises";
import { allowedAggFuncs } from "./service.js";

const checkColumnName = ({ inConfigPath }) => {
    return async (req, res, next) => {
        try {
            const columnName = req.params.columnName;
            
            // Read config schema file
            const schemaData = await fs.readFile(inConfigPath, "utf-8");
            const schema = JSON.parse(schemaData);
            
            // Validate schema structure
            if (!schema || !Array.isArray(schema.columns)) {
                return res.status(500).send("Schema configuration error");
            }
            
            // Check if columnName matches any field or columnName in the columns definition
            const columnExists = schema.columns.some(col => col.field === columnName || col.columnName === columnName);
            
            if (!columnExists) {
                return res.status(400).send(`ColumnName '${columnName}' is not in the schema.`);
            }
            
            next();
        } catch (err) {
            console.error("Middleware validation error:", err);
            res.status(500).send("Internal server error during validation");
        }
    };
};

const checkColumnsToSum = ({ inConfigPath }) => {
    return async (req, res, next) => {
        try {
            const body = req.body;

            // 1. Check if body is an object only (not null, not array)
            if (!body || typeof body !== "object" || Array.isArray(body)) {
                return res.status(400).send("Request body must be a valid JSON object");
            }

            const keys = Object.keys(body);
            
            // Read config schema file
            const schemaData = await fs.readFile(inConfigPath, "utf-8");
            const schema = JSON.parse(schemaData);
            
            if (!schema || !Array.isArray(schema.columns)) {
                return res.status(500).send("Schema configuration error");
            }

            // Extract all valid fields and columnNames from schema
            const schemaColumns = schema.columns.map(col => col.field || col.columnName).filter(Boolean);

            for (const key of keys) {
                // Check if key is a column in the schema
                if (!schemaColumns.includes(key)) {
                    return res.status(400).send(`Key '${key}' is not a valid column in the schema.`);
                }
                
                // Check if value is a valid aggregation function
                const value = body[key];
                if (!allowedAggFuncs.includes(value)) {
                    return res.status(400).send(`Value for key '${key}' must be one of: ${allowedAggFuncs.join(", ")}.`);
                }
            }

            next();
        } catch (err) {
            console.error("Middleware validation error:", err);
            res.status(500).send("Internal server error during validation");
        }
    };
};

export { checkColumnName, checkColumnsToSum };
