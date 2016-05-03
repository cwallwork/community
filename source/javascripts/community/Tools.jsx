import React                        from 'react';
import {toolList}                   from './toolList.js';
import {map, addIndex}              from 'ramda';

class Tools extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Tools';
        this.mapWithIndex = addIndex(map);
        this.tools = toolList;
    }
    render() {
      const mapWithIndex = this.mapWithIndex;
      const tools = this.tools;

      const getTools = mapWithIndex((tool, index) => {
        return (
          <div key={index} className="tool_entry">
            <a className="tool_link" href={tool.href}>
              <img src={"../images/tool_icons/" + tool.icon + ".svg"}/>
              <p>{tool.title}</p>
            </a>
          </div>
          )
      });

      return (
        <div className="tools_container">
          <h4>Thank you for signing up to host a Community Conversations Book Club.</h4>
          <p>Below are all of the tools you need to plan a successful event.</p>
          <div className="tools_list">
            {getTools(tools)}
          </div>
        </div>
      )
    }
}

export default Tools;
