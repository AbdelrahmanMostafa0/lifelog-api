import { Options } from "swagger-jsdoc";

const swaggerOptions: Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Lifelog API",
      version: "1.0.0",
      description: "A personal life logging API",
    },
    servers: [
      {
        url: "/api",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            avatar: { type: "string", nullable: true, example: null },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        Log: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            userId: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d1" },
            title: { type: "string", example: "Morning thoughts" },
            content: { type: "string", example: "Today was a productive day." },
            tags: { type: "array", items: { type: "string" }, example: ["work", "health"] },
            loggedAt: { type: "string", format: "date-time" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
        },
        SuccessResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            message: { type: "string" },
            data: {},
          },
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            message: { type: "string" },
            errors: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  field: { type: "string" },
                  message: { type: "string" },
                },
              },
            },
          },
        },
      },
    },
    paths: {
      "/auth/register": {
        post: {
          tags: ["Auth"],
          summary: "Register a new user",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["name", "email", "password"],
                  properties: {
                    name: { type: "string", minLength: 3, maxLength: 100, example: "John Doe" },
                    email: { type: "string", format: "email", example: "john@example.com" },
                    password: { type: "string", minLength: 6, example: "secret123" },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "User registered successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "User registered successfully" },
                          data: { $ref: "#/components/schemas/User" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "409": {
              description: "Email already in use",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/login": {
        post: {
          tags: ["Auth"],
          summary: "Login with email and password",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["email", "password"],
                  properties: {
                    email: { type: "string", format: "email", example: "john@example.com" },
                    password: { type: "string", minLength: 6, example: "secret123" },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Login successful — sets accessToken cookie",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "User logged in successfully" },
                          data: { $ref: "#/components/schemas/User" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Invalid credentials",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/google": {
        post: {
          tags: ["Auth"],
          summary: "Login or register with Google OAuth",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["access_token"],
                  properties: {
                    access_token: {
                      type: "string",
                      example: "ya29.a0AfH6SMB...",
                      description: "Google OAuth2 access token",
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Login successful — sets accessToken cookie",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "User logged in successfully" },
                          data: { $ref: "#/components/schemas/User" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Invalid access token",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/refresh": {
        post: {
          tags: ["Auth"],
          summary: "Refresh access and refresh tokens",
          description: "Requires a valid `refreshToken` cookie. Issues new access and refresh token cookies.",
          responses: {
            "200": {
              description: "Tokens refreshed successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "Tokens refreshed successfully" },
                          data: { $ref: "#/components/schemas/User" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Refresh token missing or invalid",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/auth/logout": {
        post: {
          tags: ["Auth"],
          summary: "Logout the current user",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "Logout successful — clears accessToken cookie",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "User logged out successfully" },
                          data: { nullable: true, example: null },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/user": {
        get: {
          tags: ["User"],
          summary: "Get the current authenticated user",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "User fetched successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "User fetched successfully" },
                          data: { $ref: "#/components/schemas/User" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "User not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/logs": {
        get: {
          tags: ["Logs"],
          summary: "Get all logs for the current user",
          security: [{ cookieAuth: [] }],
          responses: {
            "200": {
              description: "Logs retrieved successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "Logs retrieved successfully" },
                          data: {
                            type: "array",
                            items: { $ref: "#/components/schemas/Log" },
                          },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        post: {
          tags: ["Logs"],
          summary: "Create a new log entry",
          security: [{ cookieAuth: [] }],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["content"],
                  properties: {
                    title: { type: "string", example: "Morning thoughts" },
                    content: { type: "string", minLength: 1, example: "Today was a productive day." },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      example: ["work", "health"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            "201": {
              description: "Log created successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "Log created successfully" },
                          data: { $ref: "#/components/schemas/Log" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "400": {
              description: "Validation error",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
      "/logs/{id}": {
        put: {
          tags: ["Logs"],
          summary: "Update a log entry",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            },
          ],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: { type: "string", example: "Updated title" },
                    content: { type: "string", example: "Updated content." },
                    tags: {
                      type: "array",
                      items: { type: "string" },
                      example: ["work"],
                    },
                  },
                },
              },
            },
          },
          responses: {
            "200": {
              description: "Log updated successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "Log updated successfully" },
                          data: { $ref: "#/components/schemas/Log" },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Log not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
        delete: {
          tags: ["Logs"],
          summary: "Delete a log entry",
          security: [{ cookieAuth: [] }],
          parameters: [
            {
              name: "id",
              in: "path",
              required: true,
              schema: { type: "string", example: "64f1a2b3c4d5e6f7a8b9c0d2" },
            },
          ],
          responses: {
            "200": {
              description: "Log deleted successfully",
              content: {
                "application/json": {
                  schema: {
                    allOf: [
                      { $ref: "#/components/schemas/SuccessResponse" },
                      {
                        properties: {
                          message: { example: "Log deleted successfully" },
                          data: { nullable: true, example: null },
                        },
                      },
                    ],
                  },
                },
              },
            },
            "401": {
              description: "Unauthorized",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
            "404": {
              description: "Log not found",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/ErrorResponse" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export default swaggerOptions;
