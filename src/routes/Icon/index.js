const Icon = ({type}) => {
  return (
    <img src ={'https://yiy-teach-oss.oss-cn-beijing.aliyuncs.com/reactbase/ka/${type}.svg'}
    alt='icon'
    style={{width: '20px', height: '20px'}}/>
  )
}
export default Icon;