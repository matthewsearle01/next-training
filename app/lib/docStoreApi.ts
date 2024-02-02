// Function to fetch the document list
const fetchDocumentList = async (): Promise<any[]> => {
    const response = await fetch(`/api/list`);
    if (!response.ok) {
      throw new Error('Failed to fetch document list');
    }
    return await response.json();
  }
  
  export { fetchDocumentList };

// Function to fetch document metadata
const fetchDocumentMetadata = async (id: string): Promise<any> => {
    const response = await fetch(`/api/metadata/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch document metadata');
    }
    return await response.json();
  }
  
  export { fetchDocumentMetadata };  

// Function to upload a document
const uploadDocument = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append('file', file);
  
    const response = await fetch(`/api/upload`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to upload document');
    }
  
    return await response.json();
  }
  
  export { uploadDocument };

// Function to delete a document
const deleteDocument = async (id: string): Promise<any> => {
    const response = await fetch(`/api/delete/${id}`, {
      method: 'DELETE',
    });
  
    if (!response.ok) {
      throw new Error('Failed to delete document');
    }
  
    return await response.json();
  }
  
  export { deleteDocument };