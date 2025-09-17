import React, { useState, useEffect } from 'react';
import Header from "@/components/Header";
import InstallationTicketSection from "@/components/InstallationTicketSection";
import QAChecklistSection from "@/components/QAChecklistSection";
import UIRequestSection from "@/components/UIRequestSection";
import UATExcelGeneratorSection from "@/components/UATExcelGeneratorSection";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('installation');

  const handleTemplateChange = (template: string) => {
    setSelectedTemplate(template);
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-background text-foreground">
      <Header selectedTemplate={selectedTemplate} onTemplateChange={handleTemplateChange} />
      <main className="flex-grow container mx-auto p-4 flex flex-col items-center justify-center">
        {selectedTemplate === 'installation' && <InstallationTicketSection />}
        {selectedTemplate === 'qa' && <QAChecklistSection />}
        {selectedTemplate === 'ui' && <UIRequestSection />}
        {selectedTemplate === 'uat' && <UATExcelGeneratorSection />}
      </main>
      <MadeWithDyad />
    </div>
  );
};

export default Index;