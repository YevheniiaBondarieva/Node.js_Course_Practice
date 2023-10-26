export const swaggerComponents = {
  schemas: {
    Movie: {
      type: "object",
      properties: {
        title: {
          type: "string",
          description: "Movie title",
          required: true,
        },
        description: {
          type: "string",
          description: "Movie description",
          required: true,
        },
        releaseDate: {
          type: "string",
          format: "date",
          description: "Movie release date",
          required: true,
        },
        genre: {
          type: "array",
          items: {
            type: "string",
          },
          description: "Movie genres",
          required: true,
        },
      },
    },
    Genre: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Genre name",
          required: true,
        },
      },
    },
  },
};
