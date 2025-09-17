import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface HeaderProps {
  selectedTemplate: string;
  onTemplateChange: (template: string) => void;
}

const Header: React.FC<HeaderProps> = ({ selectedTemplate, onTemplateChange }) => {
  return (
    <header className="bg-primary text-primary-foreground p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 w-full">
      <h1 className="text-2xl font-bold">Multi-Template Generator</h1>
      <div className="flex items-center gap-2">
        <label htmlFor="templateSelect" className="text-lg">Select Template:</label>
        <Select value={selectedTemplate} onValueChange={onTemplateChange}>
          <SelectTrigger id="templateSelect" className="w-[200px] bg-background text-foreground">
            <SelectValue placeholder="Select a template" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="installation">Installation Ticket</SelectItem>
            <SelectItem value="qa">QA Checklist</SelectItem>
            <SelectItem value="ui">UI Request</SelectItem>
            <SelectItem value="uat">UAT Excel Generator</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </header>
  );
};

export default Header;