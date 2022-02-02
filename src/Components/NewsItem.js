import React from 'react';
class NewsItem extends React.Component {
    render() {
        let {title, description, imageUrl, newsUrl,author,date,source} = this.props;
        return (
            <div className="my-3" >
               <div className="card" >
               <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{zIndex:'1', left:'12%'}}>{source}</span>
                    <img src= {!imageUrl?"https://ichef.bbci.co.uk/news/1024/branded_news/4397/production/_122630371_hi072995594.jpg ":imageUrl} className="card-img-top" alt="..."/>
                    
                    <div className="card-body bg-black">
                        <h5 className="card-title text-info ">{title}</h5>
                        <p className="card-text text-white">{description}</p>
                        <p className="card-text text-white"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toGMTString()}</small></p>
                        <a rel = "noreferrer" href={newsUrl} target="_blank" className="btn btn-warning bg-black text-warning">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewsItem;
