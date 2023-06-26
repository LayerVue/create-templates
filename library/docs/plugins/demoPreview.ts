/// <reference types="node" />
import markdownItContainer from 'markdown-it-container';
import MarkdownIt from 'markdown-it';
import Renderer from 'markdown-it/lib/renderer';
import Token from 'markdown-it/lib/token';
import { readFileSync } from 'node:fs';
import { join } from 'path';
function markdownItCodeView(
  md: MarkdownIt,
  options: {
    componentName: string;
  } = {
    componentName: 'CodeView',
  }
) {
  const { componentName } = options;
  md.use(markdownItContainer, 'code-view', {
    validate(params: string) {
      return params.trim().match(/^code-view\s*(.*)$/);
    },
    render(tokens: Token[], idx: number, options: any, env: any, self: Renderer) {
      const m = tokens[idx].info.trim().match(/^code-view\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 找到结束标记之前的 token
        let endIndex = idx + 1;
        while (tokens[endIndex].type !== 'container_code-view_close') {
          endIndex++;
        }

        // 获取结束标记之前的所有 token 的内容
        const contentTokens = tokens.slice(idx + 2, endIndex);

        // 将内容 token 数组转换为字符串

        // 在这里可以对获取到的内容进行处理
        const component = contentTokens.map(token => token.content).join('');
        const description = m && m.length > 1 ? m[1] : '';
        try {
          const template = readFileSync(
            join(__dirname, '../components', component + '.vue'),
            'utf-8'
          );

          return `
          <${componentName} description="${description}" component="${component}" template="${btoa(template)}">`;
        } catch (error) {}
        return `<${componentName} description="${md.render(description)}">`;
      }
      return `</${componentName}>`;
    },
  });
}

export default markdownItCodeView;
