import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { showSuccess, showError } from "@/utils/toast";

const UIRequestSection: React.FC = () => {
  const [uiFeature, setUiFeature] = useState('');
  const [uiPriority, setUiPriority] = useState('');
  const [uiDesc, setUiDesc] = useState('');
  const [output, setOutput] = useState('');

  const generateUIEmail = () => {
    if (!uiFeature || !uiPriority || !uiDesc) {
      showError("Please fill in all fields to generate the email.");
      return;
    }
    const subject = `UI Request — ${uiFeature}`;
    const body = `Feature: ${uiFeature}\nPriority: ${uiPriority}\nDescription:\n${uiDesc}`;
    setOutput(`Subject: ${subject}\n\n${body}`);
    showSuccess("UI request email content generated!");
  };

  const copyToClipboard = () => {
    if (output) {
      navigator.clipboard.writeText(output)
        .then(() => showSuccess("Content copied to clipboard!"))
        .catch(() => showError("Failed to copy content."));
    } else {
      showError("No content to copy.");
    }
  };

  return (
    <Card id="ui-request-section" className="template-section w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>UI Request</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="uiFeature">Feature</Label>
          <Input id="uiFeature" value={uiFeature} onChange={(e) => setUiFeature(e.target.value)} placeholder="e.g., Dark Mode Toggle" />
        </div>
        <div>
          <Label htmlFor="uiPriority">Priority</Label>
          <Select value={uiPriority} onValueChange={setUiPriority}>
            <SelectTrigger id="uiPriority">
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="uiDesc">Description</Label>
          <Textarea id="uiDesc" value={uiDesc} onChange={(e) => setUiDesc(e.target.value)} placeholder="Describe the UI feature request" rows={5} />
        </div>
        <div className="flex gap-2">
          <Button onClick={generateUIEmail}>Generate Email</Button>
          <Button variant="outline" onClick={copyToClipboard}>Copy</Button>
        </div>
        {output && (
          <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-sm font-mono">
            {output}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UIRequestSection;