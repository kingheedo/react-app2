import React, { Component } from 'react';
import './App.css';
import ReadContent from './components/ReadContent';
import Subject from './components/Subject';
import TOC from './components/TOC';
import Control from './components/Control'
import CreateContent from './components/CreateContent';
import UpdateContent from './components/UpdateContent';
class App extends Component {
	constructor(props) {
		super(props);
		this.max_content_id = 3;
		this.state = {
			mode: 'create',
			selected_content_id: 2,
			subject: { title: 'WEB', sub: 'world wide web!' },
			welcome: { title: 'Wecome', desc: "Hello, React!!" },
			contents: [
				{ id: 1, title: 'HTML', desc: 'HTML is HyperText ...' },
				{ id: 2, title: 'CSS', desc: 'CSS is for design ...' },
				{ id: 3, title: 'JavaScript', desc: 'JavaScript is for interactive ...' },
			]
		};
	}
	getReadContent(){
		var i = 0;
			while (i < this.state.contents.length) {
				var data = this.state.contents[i];
				if (data.id === this.state.selected_content_id) {
					return data;
					break;
				}
				i = i + 1;
			}
	}
	getContent(){
		console.log('App render');
		var _title, _desc, _article = null;
		if (this.state.mode === 'welcome') {
			_title = this.state.welcome.title;
			_desc = this.state.welcome.desc;
			_article = <ReadContent title={_title} desc={_desc} />
		} else if (this.state.mode === 'read') {
			var _content = this.getReadContent();
			_article = <ReadContent title={_content._title} desc={_content._desc} />
		} else if (this.state.mode === 'create') {
			_article = <CreateContent onSubmit={function (_title, _desc) {
				console.log(_title, _desc)
				this.max_content_id = this.max_content_id + 1;
				var _contents = this.state.contents.concat({
					id: this.max_content_id, title: _title, desc: _desc
				})
				this.setState({
					contents: _contents
				})
			}.bind(this)} />
		}else if (this.state.mode === 'update') {
			_content = this.getReadContent();
			_article = <UpdateContent data= {_content} onSubmit={function (_title, _desc) {
				console.log(_title, _desc)
				this.max_content_id = this.max_content_id + 1;
				var _contents = this.state.contents.concat({
					id: this.max_content_id, title: _title, desc: _desc
				})
				this.setState({
					contents: _contents
				})
			}.bind(this)} />
		}
		return _article;
	}
	render() {
		

		return (
			<div className="App">
				<Subject
					title={this.state.subject.title}
					sub={this.state.subject.sub}
					onChangePage={function () {
						this.setState({
							mode: "welcome"
						})
					}.bind(this)}
				/>
				<TOC
					onChangePage={function (id) {
						this.setState({
							mode: "read",
							selected_content_id: Number(id)
						})

					}.bind(this)}
					data={this.state.contents} />
				<Control onChangeMode={function (mode) {
					this.setState({
						mode
					})
				}.bind(this)} />
				{this.getContent()}
			</div>
		);
	}
}

export default App;
