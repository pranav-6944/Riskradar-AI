from pydantic import BaseModel, Field
from typing import Dict, List, Any, Optional

class AnalyzeRequest(BaseModel):
    text: str = Field(..., description="Unstructured news article or regulatory complaint text")
    company: str = Field(..., description="Target corporate entity name (e.g. Goldman Sachs)")

class IngestRequest(BaseModel):
    text: str = Field(..., description="Text content to ingest")
    company: str = Field(..., description="Target company")
    source: Optional[str] = Field("API Ingestion", description="Source of information")

class SimulationToggleRequest(BaseModel):
    enabled: bool

class ScenarioTestRequest(BaseModel):
    company: str
    scenario_type: str  # e.g., "doj_raid", "aml_breach", "cyber_outage", "earnings_pr"
    custom_text: Optional[str] = None
