import fetch from 'node-fetch';

export interface CoolifyConfig {
  baseUrl: string;
  apiToken: string;
}

export class CoolifyClient {
  private baseUrl: string;
  private apiToken: string;

  constructor(config: CoolifyConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.apiToken = config.apiToken;
  }

  private async request<T>(endpoint: string, method: string = 'GET', body?: Record<string, any>): Promise<T> {
    const url = `${this.baseUrl}/api/v1${endpoint}`;
    const headers: Record<string, string> = {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const options: any = { method, headers };
    if (body) {
      options.body = JSON.stringify(body);
    }

    try {
      const response = await fetch(url, options);
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`API error ${response.status}: ${error}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        return (await response.json()) as T;
      }
      return (await response.text()) as unknown as T;
    } catch (error) {
      throw new Error(`Failed to fetch ${url}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  async getApplications() {
    return this.request('/applications');
  }

  async getApplication(id: string) {
    return this.request(`/applications/${id}`);
  }

  async getDeployments(appId: string) {
    return this.request(`/applications/${appId}/deployments`);
  }

  async getDatabases() {
    return this.request('/databases');
  }

  async getDatabase(id: string) {
    return this.request(`/databases/${id}`);
  }

  async getServers() {
    return this.request('/servers');
  }

  async getServer(id: string) {
    return this.request(`/servers/${id}`);
  }

  async getServices() {
    return this.request('/services');
  }

  async getService(id: string) {
    return this.request(`/services/${id}`);
  }

  async getProjects() {
    return this.request('/projects');
  }

  async getProject(id: string) {
    return this.request(`/projects/${id}`);
  }

  async createProject(name: string, description?: string) {
    return this.request('/projects', 'POST', {
      name,
      description: description || '',
    });
  }

  async getHealth() {
    return this.request('/health');
  }

  async getVersion() {
    return this.request('/version');
  }
}
