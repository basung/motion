import React from 'react';
import TweenOne from 'rc-tween-one';
import QueueAnim from 'rc-queue-anim';
import ScrollElement from 'rc-scroll-anim/lib/ScrollElement';
import SvgMorphPlugin from 'rc-tween-one/lib/plugin/SvgMorphPlugin';
import { Link } from 'react-router';
import { Icon } from 'antd';
import Demo from './Demo';
import Styles from './Index.less'

TweenOne.plugins.push(SvgMorphPlugin);


export default class Index extends React.Component {

	render() {
		return (
			<ScrollElement id="banner" className={Styles.bannerWrapper} >
				<svg className={Styles.bannerBgCenter} width="100%" viewBox="0 0 1200 550">
					<TweenOne
						component="circle"
						fill="rgba(161,174,245,.15)"
						r="130"
						cx="350"
						cy="350"
						animation={{
							y: 30, x: -10, repeat: -1, duration: 3000, yoyo: true,
						}}
					/>
					<TweenOne
						component="circle"
						fill="rgba(120,172,254,.1)"
						r="80"
						cx="500"
						cy="420"
						animation={{
							y: -30, x: 10, repeat: -1, duration: 3000, yoyo: true,
						}}
					/>
				</svg>
				<div className={Styles.banner}>
					<div className={Styles.bannerDemo}>
						<Demo />
					</div>
					<QueueAnim
						type="bottom"
						className={Styles.bannerText}
						delay={300}
					>
						<h1>Motion Design</h1>
						<h3>Animation specification and components of Ant Design.</h3>
						<p>
							使用 Ant Motion 能够快速在 React 框架中使用动画。<br />
							我们提供了单项，组合动画，以及整套解决方案</p>

						<a className={Styles.bannerTextButtonLeft} href="/language/basic" >了解更多<i /></a>
						<a className={Styles.bannerTextButtonRight} href="/language/basic" target="_blank">快速搭建<i /></a>

					</QueueAnim>
				</div>
			</ScrollElement>);
	}
}

