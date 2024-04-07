export interface BuildOptions {
  rootFolder: string, 
  platform: 'carbon' | 'fluent',
  buildPath: string,
  fileExtension: 'js' | 'css' | 'ts' | 'scss'
}