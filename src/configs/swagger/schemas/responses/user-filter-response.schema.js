module.exports = {
    UserFilterResponse: {
        type: "object",
        properties: { 
            status: {
                type: "number",
                description: "Status code"
            }, 
            message: {
                type: "string",
                description: "Message response"
            },
            data: {
                type: "array",
                items: {
                    $ref: '#/definitions/User'
                }
            }
        }
    }
}