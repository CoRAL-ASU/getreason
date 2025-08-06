# GETReason: Event Understanding from Images

This repository contains workbench notebooks for running large-scale experiments to extract event information from images using GPT-4o-mini and Gemini models.

## Overview

The project includes:
- **GPT Workbench** (`gpt_workbench.ipynb`): For running experiments with OpenAI's GPT-4o-mini model
- **Gemini Workbench** (`gemini_workbench.ipynb`): For running experiments with Google's Gemini model
- **Assets**: Pre-configured prompts, response structures, and celebrity data

## Prerequisites

1. **Python Environment**: Ensure you have Python 3.8+ installed
2. **API Keys**: 
   - For GPT experiments: OpenAI API key
   - For Gemini experiments: Google API key
3. **Dependencies**: Install required packages:
   ```bash
   pip install openai google-generativeai pydantic python-dotenv json-repair
   ```

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd getreason
   ```

2. **Set up environment variables**:
   Create a `.env` file in the root directory:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```

3. **Prepare your dataset**:
   - Place your images in the appropriate directory structure
   - Ensure you have the required celebrity data files in `assets/celebrity_data/`

## Running Experiments

### GPT-4o-mini Experiments

1. **Open the GPT Workbench**:
   ```bash
   jupyter notebook gpt_workbench.ipynb
   ```

2. **Configure the experiment**:
   - Set your dataset name (`tara` or `wikitilo`)
   - Choose the agent type (e.g., `global_event_specialist`, `temporal_specialist`, `spatial_specialist`)
   - Adjust batch parameters as needed

3. **Run the experiment in batches**:
   - Execute the batch preparation cell to create input files
   - Run the batch submission cell to start processing
   - Monitor batch progress using the monitoring cell
   - Process results using the output processing cell

### Gemini Experiments

1. **Open the Gemini Workbench**:
   ```bash
   jupyter notebook gemini_workbench.ipynb
   ```

2. **Configure the experiment**:
   - Set your dataset parameters
   - Choose the appropriate response structure
   - Configure batch settings

3. **Run the experiment**:
   - Execute cells sequentially to prepare and submit batches
   - Monitor progress and process results

## Batch Processing Workflow

Since these are batch processing experiments, you'll need to run cells multiple times:

### Step 1: Prepare Input Files
- Run the input preparation cell to create JSONL files for batch processing
- This splits your dataset into manageable chunks

### Step 2: Submit Batches
- Execute the batch submission cell to send requests to the API
- Each batch processes a subset of your data
- Monitor the batch status using the provided monitoring functions

### Step 3: Monitor Progress
- Use the monitoring cell to check batch completion status
- Wait for all batches to complete before proceeding

### Step 4: Process Results
- Run the result processing cell to combine outputs from all batches
- Handle any failed requests or errors
- Generate final output files

### Step 5: Repeat for Different Configurations
- Modify parameters (agent type, dataset, etc.)
- Re-run the workflow for different experimental conditions

## File Structure

```
getreason/
├── gpt_workbench.ipynb          # GPT-4o-mini experiments
├── gemini_workbench.ipynb       # Gemini experiments
├── assets/
│   ├── prompts/                 # Pre-configured prompts
│   │   ├── getreason_prompts.json
│   │   └── custom_baseline_prompts.json
│   ├── response_structures/     # JSON schemas for responses
│   │   ├── gpt_response_structures.json
│   │   ├── gemini_response_structures.json
│   │   └── qwen_response_structures.json
│   └── celebrity_data/         # Celebrity identification data
│       ├── tara_celeb_responses.json
│       └── wikitilo_celeb_responses.json
└── all_images.txt              # List of all image files
```

## Important Notes

1. **Batch Processing**: These experiments use OpenAI's batch API for efficient processing of large datasets
2. **Rate Limits**: Be aware of API rate limits and adjust batch sizes accordingly
3. **Error Handling**: Failed requests are automatically tracked and can be retried
4. **Output Format**: Results are saved in JSONL format for easy processing
5. **Cost Management**: Monitor your API usage as these experiments can be resource-intensive

## Troubleshooting

- **Missing API Keys**: Ensure your `.env` file contains valid API keys
- **Batch Failures**: Check the error logs and retry failed batches
- **Memory Issues**: Reduce batch sizes if you encounter memory problems
- **Rate Limits**: Implement delays between batch submissions if needed

## Output Files

After running experiments, you'll find:
- `output/` directory with processed results
- `errors/` directory with failed requests for retry
- CSV files tracking batch status and completion

## Citation

If you use this code in your research, please cite the GETReason paper.