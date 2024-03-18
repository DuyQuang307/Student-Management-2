import React from 'react';

class DownloadButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      downloading: false
    };
  }

  handleDownload = () => {
    this.setState({ downloading: true });

    fetch('http://localhost:8000/data_csv')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'sinh_vien.csv');
        document.body.appendChild(link);
        link.click();
        this.setState({ downloading: false });
      })
      .catch(error => {
        console.error('Error downloading CSV:', error);
        this.setState({ downloading: false });
      });
  }

  render() {
    const { downloading } = this.state;

    return (
      <div>
        <button onClick={this.handleDownload} disabled={downloading}>
          {downloading ? 'Downloading...' : 'Download CSV'}
        </button>
      </div>
    );
  }
}

export default DownloadButton;