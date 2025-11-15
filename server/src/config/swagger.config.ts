import swaggerJsdoc from 'swagger-jsdoc';
import { config } from './index.config';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Portfolio CMS API',
    version: '1.0.0',
    description:
      'A comprehensive Content Management System API for managing portfolio projects, blogs, services, skills, resume, testimonials, and FAQs.',
    contact: {
      name: 'Muhammad Jiku',
      url: 'https://github.com/muhammad-jiku',
    },
    license: {
      name: 'ISC',
      url: 'https://opensource.org/licenses/ISC',
    },
  },
  servers: [
    {
      url: `http://localhost:${config.port}/api/${config.apiVersion}`,
      description: 'Development server',
    },
    {
      url: `https://api.example.com/api/${config.apiVersion}`,
      description: 'Production server',
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'AWS Cognito JWT token',
      },
    },
    schemas: {
      Error: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: false,
          },
          message: {
            type: 'string',
            example: 'Error message',
          },
          errorMessages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                path: {
                  type: 'string',
                },
                message: {
                  type: 'string',
                },
              },
            },
          },
          stack: {
            type: 'string',
            description: 'Stack trace (only in development)',
          },
        },
      },
      SuccessResponse: {
        type: 'object',
        properties: {
          success: {
            type: 'boolean',
            example: true,
          },
          statusCode: {
            type: 'integer',
            example: 200,
          },
          message: {
            type: 'string',
            example: 'Operation successful',
          },
          data: {
            type: 'object',
            description: 'Response data',
          },
        },
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
  tags: [
    {
      name: 'Health',
      description: 'API health check endpoints',
    },
    {
      name: 'Projects',
      description: 'Project management endpoints',
    },
    {
      name: 'Blogs',
      description: 'Blog management endpoints',
    },
    {
      name: 'About',
      description: 'About statistics endpoints',
    },
    {
      name: 'Services',
      description: 'Service management endpoints',
    },
    {
      name: 'Skills',
      description: 'Skill management endpoints',
    },
    {
      name: 'Resume',
      description:
        'Resume management endpoints (Summary, Education, Experience, Achievements, References)',
    },
    {
      name: 'Testimonials',
      description: 'Testimonial management endpoints',
    },
    {
      name: 'FAQ',
      description: 'FAQ management endpoints',
    },
    {
      name: 'Trash',
      description: 'Trash and restore endpoints (Admin only)',
    },
  ],
};

const options: swaggerJsdoc.Options = {
  definition: swaggerDefinition,
  // Path to the API routes
  apis: ['./src/app/routes/*.ts', './src/app/modules/**/*.routes.ts', './src/app.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);
