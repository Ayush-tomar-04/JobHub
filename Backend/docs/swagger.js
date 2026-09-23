const swaggerJsdoc = require("swagger-jsdoc")

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "JobHub API",
            version: "1.0.0",
            description: "API documentation for JobHub"
        },

        servers: [
            {
                url: "http://localhost:3000/api/v1",
                description: "Local development server"
            }
        ],

        tags: [
            {
                name: "Authentication",
                description: "User and employer authentication APIs"
            },
            {
                name: "Users",
                description: "User related APIs"
            },
            {
                name: "Companies",
                description: "Company related APIs"
            },
            {
                name: "Employers",
                description: "Employer related APIs"
            },
            {
                name: "Jobs",
                description: "Job management and job search APIs"
            },
            {
                name: "Applications",
                description: "Job application APIs"
            },
            {
                name: "Health",
                description: "API health check"
            }
        ],

        components: {

            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            },

            schemas: {

                /* =========================
                   USER
                ========================= */

                User: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string",
                            example: "64abc1234567890123456789"
                        },
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string",
                            format: "email"
                        },
                        phone: {
                            type: "string"
                        },
                        resume: {
                            type: "string"
                        },
                        skills: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        education: {
                            type: "array",
                            items: {}
                        },
                        role: {
                            type: "string",
                            enum: ["user"]
                        }
                    }
                },

                /* =========================
                   COMPANY
                ========================= */

                Company: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        logo: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        website: {
                            type: "string"
                        },
                        location: {
                            type: "string"
                        },
                        employeeSize: {
                            type: "number"
                        },
                        foundedYear: {
                            type: "number"
                        }
                    }
                },

                /* =========================
                   EMPLOYER
                ========================= */

                Employer: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        empId: {
                            type: "string"
                        },
                        name: {
                            type: "string"
                        },
                        email: {
                            type: "string",
                            format: "email"
                        },
                        phone: {
                            type: "string"
                        },
                        companyId: {
                            type: "string"
                        },
                        role: {
                            type: "string",
                            enum: ["employer"]
                        }
                    }
                },

                /* =========================
                   JOB
                ========================= */

                Job: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        employerId: {
                            type: "string"
                        },
                        companyId: {
                            type: "string"
                        },
                        title: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        location: {
                            type: "string"
                        },
                        salary: {
                            type: "number"
                        },
                        requirements: {
                            type: "array",
                            items: {
                                type: "string"
                            }
                        },
                        experienceRequired: {
                            type: "string",
                            enum: [
                                "0-2 years",
                                "2-4 years",
                                "4-6 years",
                                "6+ years"
                            ]
                        },
                        jobType: {
                            type: "string",
                            enum: [
                                "Full-time",
                                "Part-time",
                                "Internship",
                                "Contract"
                            ]
                        },
                        isActive: {
                            type: "boolean"
                        }
                    }
                },

                /* =========================
                   APPLICATION
                ========================= */

                Application: {
                    type: "object",
                    properties: {
                        _id: {
                            type: "string"
                        },
                        userId: {
                            type: "string"
                        },
                        jobId: {
                            type: "string"
                        },
                        status: {
                            type: "string",
                            enum: [
                                "pending",
                                "reviewing",
                                "shortlisted",
                                "rejected",
                                "accepted"
                            ]
                        },
                        appliedAt: {
                            type: "string",
                            format: "date-time"
                        }
                    }
                },

                /* =========================
                   PAGINATION
                ========================= */

                Pagination: {
                    type: "object",
                    properties: {
                        page: {
                            type: "integer"
                        },
                        limit: {
                            type: "integer"
                        },
                        totalJobs: {
                            type: "integer"
                        },
                        totalPages: {
                            type: "integer"
                        }
                    }
                },

                /* =========================
                   LOGIN RESPONSE
                ========================= */

                LoginResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean"
                        },
                        token: {
                            type: "string"
                        },
                        message: {
                            type: "string"
                        }
                    }
                },

                /* =========================
                   GENERIC ERROR
                ========================= */

                ErrorResponse: {
                    type: "object",
                    properties: {
                        success: {
                            type: "boolean"
                        },
                        data: {
                            nullable: true
                        },
                        message: {
                            type: "string"
                        }
                    }
                }
            }
        },

        paths: {

            /* =================================================
               AUTHENTICATION
            ================================================= */

            "/signup": {
                post: {
                    tags: ["Authentication"],
                    summary: "Employer signup",
                    description: "Create a new employer account.",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "empId",
                                        "name",
                                        "email",
                                        "phone",
                                        "password",
                                        "companyId"
                                    ],
                                    properties: {
                                        empId: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string",
                                            format: "email"
                                        },
                                        phone: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string",
                                            format: "password"
                                        },
                                        companyId: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Employer signup successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/Employer"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid input"
                        },
                        409: {
                            description: "Email or employee ID already registered"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/login": {
                post: {
                    tags: ["Authentication"],
                    summary: "Employer login",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "email",
                                        "password"
                                    ],
                                    properties: {
                                        email: {
                                            type: "string",
                                            format: "email"
                                        },
                                        password: {
                                            type: "string",
                                            format: "password"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Employer login successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginResponse"
                                    }
                                }
                            }
                        },
                        409: {
                            description: "Invalid email or password"
                        },
                        500: {
                            description: "Login failed"
                        }
                    }
                }
            },

            "/user/login": {
                post: {
                    tags: ["Authentication"],
                    summary: "User login",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "email",
                                        "password"
                                    ],
                                    properties: {
                                        email: {
                                            type: "string",
                                            format: "email"
                                        },
                                        password: {
                                            type: "string",
                                            format: "password"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "User login successful",
                            content: {
                                "application/json": {
                                    schema: {
                                        $ref: "#/components/schemas/LoginResponse"
                                    }
                                }
                            }
                        },
                        404: {
                            description: "User not found"
                        },
                        401: {
                            description: "Incorrect password"
                        },
                        500: {
                            description: "Login failed"
                        }
                    }
                }
            },

            /* =================================================
               USERS
            ================================================= */

            "/user": {
                post: {
                    tags: ["Users"],
                    summary: "Create user",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "name",
                                        "email",
                                        "phone",
                                        "password",
                                        "resume",
                                        "skills",
                                        "education"
                                    ],
                                    properties: {
                                        name: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string",
                                            format: "email"
                                        },
                                        phone: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string",
                                            format: "password"
                                        },
                                        resume: {
                                            type: "string"
                                        },
                                        skills: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        },
                                        education: {
                                            type: "array",
                                            items: {}
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "User created successfully"
                        },
                        400: {
                            description: "Invalid input"
                        },
                        409: {
                            description: "Email or phone already exists"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/user/userProfile": {
                get: {
                    tags: ["Users"],
                    summary: "Get logged-in user profile",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        200: {
                            description: "User profile fetched successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/User"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        401: {
                            description: "Invalid authentication token"
                        },
                        404: {
                            description: "User not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            /* =================================================
               COMPANY
            ================================================= */

            "/company": {
                post: {
                    tags: ["Companies"],
                    summary: "Create company",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "name",
                                        "logo",
                                        "description",
                                        "website",
                                        "location",
                                        "employeeSize",
                                        "foundedYear"
                                    ],
                                    properties: {
                                        name: {
                                            type: "string"
                                        },
                                        logo: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        website: {
                                            type: "string"
                                        },
                                        location: {
                                            type: "string"
                                        },
                                        employeeSize: {
                                            type: "number"
                                        },
                                        foundedYear: {
                                            type: "number"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Company created successfully"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            /* =================================================
               EMPLOYER
            ================================================= */

            "/employer": {
                post: {
                    tags: ["Employers"],
                    summary: "Create employer",

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "empId",
                                        "name",
                                        "email",
                                        "phone",
                                        "password",
                                        "companyId"
                                    ],
                                    properties: {
                                        empId: {
                                            type: "string"
                                        },
                                        name: {
                                            type: "string"
                                        },
                                        email: {
                                            type: "string"
                                        },
                                        phone: {
                                            type: "string"
                                        },
                                        password: {
                                            type: "string"
                                        },
                                        companyId: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Employer created successfully"
                        },
                        404: {
                            description: "Employer creation failed"
                        }
                    }
                }
            },

            /* =================================================
               JOBS
            ================================================= */

            "/jobs": {

                get: {
                    tags: ["Jobs"],
                    summary: "Get all active jobs",

                    parameters: [

                        {
                            in: "query",
                            name: "search",
                            schema: {
                                type: "string"
                            },
                            description: "Search by title, description or location"
                        },

                        {
                            in: "query",
                            name: "location",
                            schema: {
                                type: "string"
                            },
                            description: "Filter jobs by location"
                        },

                        {
                            in: "query",
                            name: "jobType",
                            schema: {
                                type: "string",
                                enum: [
                                    "Full-time",
                                    "Part-time",
                                    "Internship",
                                    "Contract"
                                ]
                            }
                        },

                        {
                            in: "query",
                            name: "experienceRequired",
                            schema: {
                                type: "string",
                                enum: [
                                    "0-2 years",
                                    "2-4 years",
                                    "4-6 years",
                                    "6+ years"
                                ]
                            }
                        },

                        {
                            in: "query",
                            name: "salary",
                            schema: {
                                type: "number",
                                minimum: 0
                            },
                            description: "Minimum salary"
                        },

                        {
                            in: "query",
                            name: "page",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                default: 1
                            }
                        },

                        {
                            in: "query",
                            name: "limit",
                            schema: {
                                type: "integer",
                                minimum: 1,
                                maximum: 50,
                                default: 10
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Jobs fetched successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Job"
                                                }
                                            },
                                            pagination: {
                                                $ref: "#/components/schemas/Pagination"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid pagination parameters"
                        },
                        500: {
                            description: "Internal server error"
                        }
                    }
                },

                post: {
                    tags: ["Jobs"],
                    summary: "Create a job",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: [
                                        "title",
                                        "description",
                                        "location",
                                        "salary",
                                        "requirements",
                                        "experienceRequired",
                                        "jobType"
                                    ],
                                    properties: {
                                        title: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        location: {
                                            type: "string"
                                        },
                                        salary: {
                                            type: "number"
                                        },
                                        requirements: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        },
                                        experienceRequired: {
                                            type: "string",
                                            enum: [
                                                "0-2 years",
                                                "2-4 years",
                                                "4-6 years",
                                                "6+ years"
                                            ]
                                        },
                                        jobType: {
                                            type: "string",
                                            enum: [
                                                "Full-time",
                                                "Part-time",
                                                "Internship",
                                                "Contract"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Job created successfully"
                        },
                        400: {
                            description: "Invalid job data"
                        },
                        404: {
                            description: "Employer not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/jobs/{jobId}": {

                get: {
                    tags: ["Jobs"],
                    summary: "Get one active job",

                    parameters: [
                        {
                            in: "path",
                            name: "jobId",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Job fetched successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/Job"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        404: {
                            description: "Job not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/updateJob/{jobId}": {

                patch: {
                    tags: ["Jobs"],
                    summary: "Update a job",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    parameters: [
                        {
                            in: "path",
                            name: "jobId",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        title: {
                                            type: "string"
                                        },
                                        description: {
                                            type: "string"
                                        },
                                        location: {
                                            type: "string"
                                        },
                                        salary: {
                                            type: "number"
                                        },
                                        requirements: {
                                            type: "array",
                                            items: {
                                                type: "string"
                                            }
                                        },
                                        experienceRequired: {
                                            type: "string"
                                        },
                                        jobType: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Job updated successfully"
                        },
                        400: {
                            description: "Invalid job ID or update fields"
                        },
                        403: {
                            description: "Employer does not own this job"
                        },
                        404: {
                            description: "Job not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/deleteJob/{jobId}": {

                delete: {
                    tags: ["Jobs"],
                    summary: "Deactivate a job",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    parameters: [
                        {
                            in: "path",
                            name: "jobId",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],

                    responses: {
                        200: {
                            description: "Job deactivated successfully"
                        },
                        400: {
                            description: "Invalid job ID"
                        },
                        403: {
                            description: "Employer does not own this job"
                        },
                        404: {
                            description: "Job not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            /* =================================================
               APPLICATIONS
            ================================================= */

            "/application": {

                post: {
                    tags: ["Applications"],
                    summary: "Apply for a job",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["jobId"],
                                    properties: {
                                        jobId: {
                                            type: "string"
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        201: {
                            description: "Application created successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                $ref: "#/components/schemas/Application"
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        400: {
                            description: "Invalid job ID or inactive job"
                        },
                        401: {
                            description: "Authentication failed"
                        },
                        404: {
                            description: "Job not found"
                        },
                        409: {
                            description: "User already applied for this job"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/applications": {

                get: {
                    tags: ["Applications"],
                    summary: "Get current user's applications",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        200: {
                            description: "Applications fetched successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Application"
                                                }
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/employer/jobs": {

                get: {
                    tags: ["Employers"],
                    summary: "Get employer's jobs",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        200: {
                            description: "Employer jobs fetched successfully",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            success: {
                                                type: "boolean"
                                            },
                                            data: {
                                                type: "array",
                                                items: {
                                                    $ref: "#/components/schemas/Job"
                                                }
                                            },
                                            message: {
                                                type: "string"
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/employer/applications": {

                get: {
                    tags: ["Applications"],
                    summary: "Get applications for employer's jobs",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    responses: {
                        200: {
                            description: "Employer applications fetched successfully"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            "/applications/{applicationId}/status": {

                patch: {
                    tags: ["Applications"],
                    summary: "Update application status",

                    security: [
                        {
                            bearerAuth: []
                        }
                    ],

                    parameters: [
                        {
                            in: "path",
                            name: "applicationId",
                            required: true,
                            schema: {
                                type: "string"
                            }
                        }
                    ],

                    requestBody: {
                        required: true,
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    required: ["status"],
                                    properties: {
                                        status: {
                                            type: "string",
                                            enum: [
                                                "pending",
                                                "reviewing",
                                                "shortlisted",
                                                "rejected",
                                                "accepted"
                                            ]
                                        }
                                    }
                                }
                            }
                        }
                    },

                    responses: {
                        200: {
                            description: "Application status updated successfully"
                        },
                        400: {
                            description: "Invalid application status"
                        },
                        403: {
                            description: "Unauthorized employer"
                        },
                        404: {
                            description: "Application or job not found"
                        },
                        500: {
                            description: "Server error"
                        }
                    }
                }
            },

            /* =================================================
               HEALTH
            ================================================= */

            "/health": {

                get: {
                    tags: ["Health"],
                    summary: "Check API health",

                    responses: {
                        200: {
                            description: "API is running",
                            content: {
                                "application/json": {
                                    schema: {
                                        type: "object",
                                        properties: {
                                            message: {
                                                type: "string",
                                                example: "JobHub Api run successfully"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    // IMPORTANT:
    // Documentation ab swagger.js ke paths se aa rahi hai.
    // route.js ko Swagger ke liye scan nahi karna hai.
    apis: []
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec