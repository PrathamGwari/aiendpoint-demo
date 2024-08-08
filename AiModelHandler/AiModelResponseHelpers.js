const axios = require("axios");
const AiModel = require("../models/AiModel");

async function getResponseFromAiModel(
  aiModelId,
  queryMessage,
  knowledgePoolData
) {
  try {
    const aiModel = await AiModel.findById(aiModelId);
    if (!aiModel) {
      throw new Error(`AI model with ID '${aiModelId}' not found`);
    }

    const { data, headers } = JSON.parse(aiModel.apiKey);

    console.log("aiModel ---------------------------------->", aiModel);
    // Generate prompt using knowledge pool data
    const fullPrompt = `Below is context for you ${knowledgePoolData}\n Answer the user query below based on the information provided above.`;

    const response = await axios.post(
      aiModel.url,
      {
        ...data,
        messages: [
          {
            role: "system",
            content: `You are a helpful assistant.\n${fullPrompt}`,
          },
          {
            role: "user",
            content: `Please answer my query below\n ${queryMessage}`,
          },
        ],
      },
      {
        headers: {
          ...headers,
        },
      }
    );

    return {
      modelName: aiModel.name,
      response: response.data,
    };
  } catch (error) {
    console.error(
      `Failed to get response from AI model with ID '${aiModelId}':`,
      error
    );
    throw error;
  }
}

async function getResponsesFromAiModels(
  aiModels,
  queryMessage,
  knowledgePoolData
) {
  try {
    // Prepare requests for each AI model
    const aiModelRequests = aiModels.map(async (aiModel) => {
      try {
        const response = await getResponseFromAiModel(
          aiModel._id,
          queryMessage,
          knowledgePoolData
        );
        return {
          modelName: aiModel.name,
          response: response,
        };
      } catch (error) {
        return {
          modelName: aiModel.name,
          response: `Error: ${error.message}`, // Handle error response gracefully
        };
      }
    });

    // Execute all requests in parallel
    const aiModelResponses = await Promise.all(aiModelRequests);

    return {
      status: "success",
      data: aiModelResponses,
    };
  } catch (error) {
    console.error("Error fetching responses from AI models:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
}

module.exports = getResponsesFromAiModels;

module.exports = getResponsesFromAiModels;
