import React, { Component } from 'react'

export default class Template extends Component {
    render() {
        //  console.log(this.props);

        return (
            <div className="container-fluid">
                <div className="card mb-3" style={{maxWidth: "flex"}}>
  <div className="row g-0">
    <div className="col-md-4" >
      <img className="img-thumbnail" src={this.props.img} alt={this.props.alt} style={{alignContent:'left'}}></img>
    </div>
    <div className="col-md-8">
      <div className="card-body">
        <h5 className="card-title" ><a href={this.props.link}>{this.props.title}</a></h5>
        <p className="card-text">{this.props.desc}</p>
        <p className="card-text"><small className="text-muted">{this.props.date}</small>
        <a href="https://www.moneycontrol.com" style={{float:'right'}}><small>{this.props.newsSrc}</small></a></p>
      </div>
    </div>
  </div>
</div>
            </div>
        )
    }
}
