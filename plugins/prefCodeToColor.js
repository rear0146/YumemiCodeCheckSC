export default ({ app }, inject) => {
    inject('prefCodeToColor', (prefCode) => {
        const H = Math.floor(prefCode / 2) * 15
        const S = (prefCode % 2 + 1) * 100
        const V = 210
        
        const M = V - ((S / 255) * V)
    
        let RGB = []

        if (H >= 0 && H < 60) {
            RGB = [V, (H / 60) * (V - M) + M, M]
        } else if (H >= 60 && H < 120) {
            RGB = [((120 - H) / 60) * (V - M) + M, V, M]
        } else if (H >= 120 && H < 180) {
            RGB = [M, V, ((H - 120) / 60) * (V - M) + M]
        } else if (H >= 180 && H < 240) {
            RGB = [M, ((240 - H) / 60) * (V - M) + M, V]
        } else if (H >= 240 && H < 300) {
            RGB = [((H - 240) / 60) * (V - M) + M, M, V]
        } else {
            RGB = [V, M, ((360 - H) / 60) * (V - M) + M]
        }

        RGB = RGB.map(function(rgb){
            return Math.floor(rgb)
        })

        return RGB
    })
  }