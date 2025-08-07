# GETReason: Code Implementation

<div align="center">

![GETReason Code](https://img.shields.io/badge/GETReason-Code%20Implementation-blue)
![Experiments](https://img.shields.io/badge/Experiments-Available-green)
![Datasets](https://img.shields.io/badge/Datasets-17.5K%20Samples-orange)
![Models](https://img.shields.io/badge/Models-GPT%20%7C%20Gemini%20%7C%20Qwen-purple)

**Implementation and experiments for GETReason: Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning**

[Main Project](../README.md) | [Paper](https://aclanthology.org/2025.acl-long.1439/) | [arXiv](https://arxiv.org/abs/2505.21863) | [Dataset](./dataset/)

</div>

---

This directory contains workbench notebooks for running large-scale experiments to extract event information from images using GPT-4o-mini and Gemini models.

## 🎯 Overview

The project includes:

- **🔧 GPT Workbench** (`gpt_workbench.ipynb`): For running experiments with OpenAI's GPT-4o-mini model
- **🤖 Gemini Workbench** (`gemini_workbench.ipynb`): For running experiments with Google's Gemini model
- **📦 Assets**: Pre-configured prompts, response structures, and celebrity data
- **📊 Augmented Datasets**: Gold-standard annotations for evaluation and training

## ⚙️ Prerequisites

1. **🐍 Python Environment**: Ensure you have Python 3.8+ installed
2. **🔑 API Keys**:
   - For GPT experiments: OpenAI API key
   - For Gemini experiments: Google API key
3. **📦 Dependencies**: Install required packages:
   ```bash
   pip install openai google-generativeai pydantic python-dotenv json-repair
   ```

## 🚀 Setup

1. **📥 Clone the repository**:

   ```bash
   git clone <repository-url>
   cd getreason
   ```
2. **🔧 Set up environment variables**:
   Create a `.env` file in the root directory:

   ```
   OPENAI_API_KEY=your_openai_api_key_here
   GOOGLE_API_KEY=your_google_api_key_here
   ```
3. **📁 Prepare your dataset**:

   - Place your images in the appropriate directory structure
   - Ensure you have the required celebrity data files in `assets/celebrity_data/` for GPT experiments
   - The augmented datasets in `dataset/` directory are ready for evaluation

## 🔬 Running Experiments

### 🔧 GPT-4o-mini Experiments

1. **📖 Open the GPT Workbench**:

   ```bash
   jupyter notebook gpt_workbench.ipynb
   ```
2. **⚙️ Configure the experiment**:

   - Set your dataset name (`tara` or `wikitilo`)
   - Choose the agent type (e.g., `global_event_specialist`, `temporal_specialist`, `spatial_specialist`)
   - Adjust batch parameters as needed
3. **🔄 Run the experiment in batches**:

   - Execute the batch preparation cell to create input files
   - Run the batch submission cell to start processing
   - Monitor batch progress using the monitoring cell
   - Process results using the output processing cell

### 🤖 Gemini Experiments

1. **📖 Open the Gemini Workbench**:

   ```bash
   jupyter notebook gemini_workbench.ipynb
   ```
2. **⚙️ Configure the experiment**:

   - Set your dataset parameters
   - Choose the appropriate response structure
   - Configure batch settings
3. **🔄 Run the experiment**:

   - Execute cells sequentially to prepare and submit batches
   - Monitor progress and process results

## 🔄 Batch Processing Workflow

Since these are batch processing experiments, you'll need to run cells multiple times:

### 📋 Step 1: Prepare Input Files

- Run the input preparation cell to create JSONL files for batch processing
- This splits your dataset into manageable chunks

### 📤 Step 2: Submit Batches

- Execute the batch submission cell to send requests to the API
- Each batch processes a subset of your data
- Monitor the batch status using the provided monitoring functions

### 📊 Step 3: Monitor Progress

- Use the monitoring cell to check batch completion status
- Wait for all batches to complete before proceeding

### 📥 Step 4: Process Results

- Run the result processing cell to combine outputs from all batches
- Handle any failed requests or errors
- Generate final output files

### 🔁 Step 5: Repeat for Different Configurations

- Modify parameters (agent type, dataset, etc.)
- Re-run the workflow for different experimental conditions

## 📁 File Structure

```
getreason/code/
├── 📓 gpt_workbench.ipynb          # GPT-4o-mini experiments
├── 🤖 gemini_workbench.ipynb       # Gemini experiments
├── 📊 dataset/                     # Augmented datasets with gold annotations
│   ├── gold_tara.jsonl         # TARA dataset (11,240 samples)
│   └── gold_wikitilo.jsonl     # WikiTilo dataset (6,296 samples)
├── 📦 assets/
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
└── 📄 all_images.txt              # List of all image files
```

## ⚠️ Important Notes

1. **🔄 Batch Processing**: These experiments use OpenAI's batch API for efficient processing of large datasets
2. **⏱️ Rate Limits**: Be aware of API rate limits and adjust batch sizes accordingly
3. **🛡️ Error Handling**: Failed requests are automatically tracked and can be retried
4. **📄 Output Format**: Results are saved in JSONL format for easy processing
5. **💰 Cost Management**: Monitor your API usage as these experiments can be resource-intensive

## 🔧 Troubleshooting

- **🔑 Missing API Keys**: Ensure your `.env` file contains valid API keys
- **❌ Batch Failures**: Check the error logs and retry failed batches
- **💾 Memory Issues**: Reduce batch sizes if you encounter memory problems
- **⏱️ Rate Limits**: Implement delays between batch submissions if needed

## 📊 Augmented Datasets

This repository includes two augmented datasets with comprehensive gold-standard annotations:

### 📰 TARA Dataset (`gold_tara.jsonl`)

- **📈 Size**: 11,240 samples
- **📋 Content**: Rich event information including:
  - Event descriptions and reasoning
  - Background context
  - Entity recognition with attributes
  - Geospatial information (country, state/province, city)
  - Temporal information (century, decade, year, month, day)

### 📚 WikiTilo Dataset (`gold_wikitilo.jsonl`)

- **📈 Size**: 6,296 samples
- **📋 Content**: Focused on temporal and geospatial information:
  - Temporal information (century, decade, year, month, day)
  - Geospatial information (country, state/province, city)

These datasets serve as evaluation benchmarks and can be used for training and fine-tuning models for event understanding tasks.

## 📁 Output Files

After running experiments, you'll find:

- `📊 output/` directory with processed results
- `❌ errors/` directory with failed requests for retry
- `📈 CSV files` tracking batch status and completion

## 📄 Citation

If you use this code, datasets, or findings from our work in your research, please cite our paper:

**Paper**: [GETReason: Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning](https://aclanthology.org/2025.acl-long.1439/) (ACL 2025) | [arXiv Version](https://arxiv.org/abs/2505.21863)

```bibtex
@inproceedings{siingh-etal-2025-getreason,
    title = "{GETR}eason: Enhancing Image Context Extraction through Hierarchical Multi-Agent Reasoning",
    author = "Siingh, Shikhhar  and
      Rawat, Abhinav  and
      Baral, Chitta  and
      Gupta, Vivek",
    editor = "Che, Wanxiang  and
      Nabende, Joyce  and
      Shutova, Ekaterina  and
      Pilehvar, Mohammad Taher",
    booktitle = "Proceedings of the 63rd Annual Meeting of the Association for Computational Linguistics (Volume 1: Long Papers)",
    month = jul,
    year = "2025",
    address = "Vienna, Austria",
    publisher = "Association for Computational Linguistics",
    url = "https://aclanthology.org/2025.acl-long.1439/",
    doi = "10.18653/v1/2025.acl-long.1439",
    pages = "29779--29800",
    ISBN = "979-8-89176-251-0",
    abstract = "Publicly significant images from events carry valuable contextual information with applications in domains such as journalism and education. However, existing methodologies often struggle to accurately extract this contextual relevance from images. To address this challenge, we introduce GETREASON (Geospatial Event Temporal Reasoning), a framework designed to go beyond surfacelevel image descriptions and infer deeper contextual meaning. We hypothesize that extracting global event, temporal, and geospatial information from an image enables a more accurate understanding of its contextual significance. We also introduce a new metric GREAT (Geospatial, Reasoning and Event Accuracy with Temporal alignment) for a reasoning capturing evaluation. Our layered multi-agentic approach, evaluated using a reasoning-weighted metric, demonstrates that meaningful information can be inferred from images, allowing them to be effectively linked to their corresponding events and broader contextual background."
}
```

## 📞 Contact

For questions, issues, or collaboration inquiries, please contact the authors:

- **Shikhhar Siingh**: ssiingh@asu.edu
- **Abhinav Rawat**: arawat21@asu.edu

---

<div align="center">

**GETReason Code Implementation**

[![Main Project](../README.md)](../README.md) | [![Paper](https://img.shields.io/badge/Paper-ACL%202025-green)](https://aclanthology.org/2025.acl-long.1439/) | [![arXiv](https://img.shields.io/badge/arXiv-2505.21863-b31b1b)](https://arxiv.org/abs/2505.21863)

</div>
