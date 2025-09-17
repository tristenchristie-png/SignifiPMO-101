import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { generateUATExcel } from "@/lib/excelUtils";
import { showSuccess, showError } from "@/utils/toast";

const UATExcelGeneratorSection: React.FC = () => {
  const [uatProject, setUatProject] = useState('');
  const [uatOwner, setUatOwner] = useState('');

  const handleGenerateExcel = () => {
    if (!uatProject || !uatOwner) {
      showError("Please fill in both Project and Owner fields.");
      return;
    }
    generateUATExcel(uatProject, uatOwner);
    showSuccess("UAT Excel file generated and downloaded!");
  };

  return (
    <Card id="uat-generator-section" className="template-section w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>UAT Excel Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="uatProject">Project</Label>
          <Input id="uatProject" value={uatProject} onChange={(e) => setUatProject(e.target.value)} placeholder="e.g., Project Alpha" />
        </div>
        <div>
          <Label htmlFor="uatOwner">Owner</Label>
          <Input id="uatOwner" value={uatOwner} onChange={(e) => setUatOwner(e.target.value)} placeholder="e.g., John Doe" />
        </div>
        <Button onClick={handleGenerateExcel}>Generate Excel</Button>
      </CardContent>
    </Card>
  );
};

export default UATExcelGeneratorSection;