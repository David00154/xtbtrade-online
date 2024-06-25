const fs = require("fs");
const path = require("path");

const emailTemplate = ({ title, url, body }) => {
  // return html`
  // 	<html>
  // 		<head>
  // 			<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  // 			<link
  // 				rel="stylesheet"
  // 				type="text/css"
  // 				id="mce-u0"
  // 				href="https://webmail.fxnetwork.space/cpsess8311943719/3rdparty/roundcube/program/js/tinymce/skins/ui/oxide/content.min.css?s=5080200"
  // 			/>
  // 			<link
  // 				rel="stylesheet"
  // 				type="text/css"
  // 				id="mce-u1"
  // 				href="https://webmail.fxnetwork.space/cpsess8311943719/3rdparty/roundcube/skins/elastic/styles/embed.min.css?s=5080200"
  // 			/>
  // 			<style type="text/css">
  // 				body {
  // 					font-family: Verdana, Geneva, sans-serif;
  // 					font-size: 10pt;
  // 				}
  // 			</style>
  // 		</head>

  // 		<body
  // 			id="tinymce"
  // 			class="mce-content-body "
  // 			data-id="composebody"
  // 			contenteditable="true"
  // 			style="overflow-y: hidden; padding-left: 1px; padding-right: 1px; min-height: 0px;"
  // 			data-mce-style="overflow-y: hidden; padding-left: 1px; padding-right: 1px; min-height: 0px;"
  // 		>
  // 			<div id="forwardbody1">
  // 				<div
  // 					style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 					data-mce-style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 				>
  // 					<div id="v1forwardbody1">
  // 						<div
  // 							style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 							data-mce-style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 						>
  // 							<div id="v1v1forwardbody1">
  // 								<div
  // 									style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 									data-mce-style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 								>
  // 									<p><br data-mce-bogus="1" /></p>
  // 									<div id="v1v1v1forwardbody1">
  // 										<div
  // 											style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 											data-mce-style="font-size: 10pt; font-family: Verdana,Geneva,sans-serif;"
  // 										>
  // 											<p><br /></p>
  // 											<div
  // 												id="v1v1v1v1wrapper"
  // 												dir="ltr"
  // 												style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;"
  // 												data-mce-style="background-color: #f7f7f7; margin: 0; padding: 70px 0; width: 100%; -webkit-text-size-adjust: none;"
  // 											>
  // 												<table border="0" width="100%" cellspacing="0" cellpadding="0" class="mce-item-table">
  // 													<tbody>
  // 														<tr>
  // 															<td align="center" valign="top">
  // 																<div id="v1v1v1v1template_header_image"></div>
  // 																<table
  // 																	id="v1v1v1v1template_container"
  // 																	style="background-color: #fff; border: 1px solid #dedede; box-shadow: 0 1px 4px rgba(0,0,0,.1); border-radius: 3px;"
  // 																	border="0"
  // 																	width="600"
  // 																	cellspacing="0"
  // 																	cellpadding="0"
  // 																	bgcolor="#fff"
  // 																	data-mce-style="background-color: #fff; border: 1px solid #dedede; box-shadow: 0 1px 4px rgba(0,0,0,.1); border-radius: 3px;"
  // 																	class="mce-item-table"
  // 																>
  // 																	<tbody>
  // 																		<tr>
  // 																			<td align="center" valign="top">
  // 																				<table
  // 																					id="v1v1v1v1template_header"
  // 																					style="background-color: #7f54b3; color: #fff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; border-radius: 3px 3px 0 0;"
  // 																					border="0"
  // 																					width="100%"
  // 																					cellspacing="0"
  // 																					cellpadding="0"
  // 																					bgcolor="#7f54b3"
  // 																					data-mce-style="background-color: #7f54b3; color: #fff; border-bottom: 0; font-weight: bold; line-height: 100%; vertical-align: middle; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; border-radius: 3px 3px 0 0;"
  // 																					class="mce-item-table"
  // 																				>
  // 																					<tbody>
  // 																						<tr>
  // 																							<td
  // 																								id="v1v1v1v1header_wrapper"
  // 																								style="padding: 36px 48px; display: block;"
  // 																								data-mce-style="padding: 36px 48px; display: block;"
  // 																							>
  // 																								<h1
  // 																									style="font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #9976c2; color: #fff; background-color: inherit;"
  // 																									data-mce-style="font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 30px; font-weight: 300; line-height: 150%; margin: 0; text-align: left; text-shadow: 0 1px 0 #9976c2; color: #fff; background-color: inherit;"
  // 																								>
  // 																									${title}
  // 																								</h1>
  // 																							</td>
  // 																						</tr>
  // 																					</tbody>
  // 																				</table>
  // 																			</td>
  // 																		</tr>
  // 																		<tr>
  // 																			<td align="center" valign="top">
  // 																				<table
  // 																					id="v1v1v1v1template_body"
  // 																					border="0"
  // 																					width="600"
  // 																					cellspacing="0"
  // 																					cellpadding="0"
  // 																					class="mce-item-table"
  // 																				>
  // 																					<tbody>
  // 																						<tr>
  // 																							<td
  // 																								id="v1v1v1v1body_content"
  // 																								style="background-color: #fff;"
  // 																								valign="top"
  // 																								bgcolor="#fff"
  // 																								data-mce-style="background-color: #fff;"
  // 																							>
  // 																								<table
  // 																									border="0"
  // 																									width="100%"
  // 																									cellspacing="0"
  // 																									cellpadding="20"
  // 																									class="mce-item-table"
  // 																								>
  // 																									<tbody>
  // 																										<tr>
  // 																											<td
  // 																												style="padding: 48px 48px 32px;"
  // 																												valign="top"
  // 																												data-mce-style="padding: 48px 48px 32px;"
  // 																											>
  // 																												<div
  // 																													id="v1v1v1v1body_content_inner"
  // 																													style="color: #636363; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 14px; line-height: 150%; text-align: left;"
  // 																													align="left"
  // 																													data-mce-style="color: #636363; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 14px; line-height: 150%; text-align: left;"
  // 																												>
  // 																													<p>${body}</p>
  // 																													<hr />
  // 																													<p
  // 																														style="margin: 0 0 16px;"
  // 																														data-mce-style="margin: 0 0 16px;"
  // 																													>
  // 																														<br />
  // 																													</p>
  // 																													<h2
  // 																														style="color: #7f54b3; display: block; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;"
  // 																														data-mce-style="color: #7f54b3; display: block; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 18px; font-weight: bold; line-height: 130%; margin: 0 0 18px; text-align: left;"
  // 																													>
  // 																														Our Company
  // 																													</h2>
  // 																													<p
  // 																														style="margin: 0 0 16px;"
  // 																														data-mce-style="margin: 0 0 16px;"
  // 																													>
  // 																														Xtb Online Trade is the easiest place to invest and trade
  // 																														cryptocurrency. Sign up and get started today.
  // 																														<br /><br />Our mission is to become the most trustworthy
  // 																														cryptocurrency and derivatives trading platform We see
  // 																														ourselves becoming a leading financial services provider
  // 																														in this industry, one that is unrivaled in
  // 																														trustworthiness, honesty, and integrity.
  // 																														<br /><br />Visit
  // 																														<a
  // 																															class="v1v1v1v1link"
  // 																															style="font-weight: normal; text-decoration: underline; color: #7f54b3;"
  // 																															href="https://xtbonlinetrading.vercel.app"
  // 																															target="_blank"
  // 																															rel="noopener noreferrer"
  // 																															data-mce-href="https://xtbonlinetrading.vercel.app"
  // 																															data-mce-style="font-weight: normal; text-decoration: underline; color: #7f54b3;"
  // 																															>our Website</a
  // 																														>
  // 																														to jump and start your trading portfolio.
  // 																													</p>
  // 																													<br /><br />
  // 																													<p
  // 																														style="margin: 0 0 16px;"
  // 																														data-mce-style="margin: 0 0 16px;"
  // 																													>
  // 																														Thanks,<br />- Xtb Online Trade.
  // 																													</p>
  // 																												</div>
  // 																											</td>
  // 																										</tr>
  // 																									</tbody>
  // 																								</table>
  // 																							</td>
  // 																						</tr>
  // 																					</tbody>
  // 																				</table>
  // 																			</td>
  // 																		</tr>
  // 																	</tbody>
  // 																</table>
  // 															</td>
  // 														</tr>
  // 														<tr>
  // 															<td align="center" valign="top">
  // 																<table
  // 																	id="v1v1v1v1template_footer"
  // 																	border="0"
  // 																	width="600"
  // 																	cellspacing="0"
  // 																	cellpadding="10"
  // 																	class="mce-item-table"
  // 																>
  // 																	<tbody>
  // 																		<tr>
  // 																			<td
  // 																				style="padding: 0; border-radius: 6px;"
  // 																				valign="top"
  // 																				data-mce-style="padding: 0; border-radius: 6px;"
  // 																			>
  // 																				<table border="0" width="100%" cellspacing="0" cellpadding="10" class="mce-item-table">
  // 																					<tbody>
  // 																						<tr>
  // 																							<td
  // 																								id="v1v1v1v1credit"
  // 																								style="border-radius: 6px; border: 0; color: #8a8a8a; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding: 24px 0;"
  // 																								colspan="2"
  // 																								align="center"
  // 																								valign="middle"
  // 																								data-mce-style="border-radius: 6px; border: 0; color: #8a8a8a; font-family: 'Helvetica Neue',Helvetica,Roboto,Arial,sans-serif; font-size: 12px; line-height: 150%; text-align: center; padding: 24px 0;"
  // 																							>
  // 																								<p style="margin: 0 0 16px;" data-mce-style="margin: 0 0 16px;">
  // 																									Copyright © 2022
  // 																									<a
  // 																										style="color: #7f54b3; font-weight: normal; text-decoration: underline;"
  // 																										href="https://xtbonlinetrading.vercel.app"
  // 																										target="_blank"
  // 																										rel="noopener noreferrer"
  // 																										data-mce-href="https://xtbonlinetrading.vercel.app"
  // 																										data-mce-style="color: #7f54b3; font-weight: normal; text-decoration: underline;"
  // 																										>Xtb Online Trade.</a
  // 																									>
  // 																									All Rights Reserved.
  // 																								</p>
  // 																							</td>
  // 																						</tr>
  // 																					</tbody>
  // 																				</table>
  // 																			</td>
  // 																		</tr>
  // 																	</tbody>
  // 																</table>
  // 															</td>
  // 														</tr>
  // 													</tbody>
  // 												</table>
  // 											</div>
  // 										</div>
  // 									</div>
  // 								</div>
  // 							</div>
  // 						</div>
  // 					</div>
  // 				</div>
  // 			</div>
  // 			<div id="_rc_sig"></div>
  // 		</body>
  // 		<div
  // 			data-row="0"
  // 			role="presentation"
  // 			class="ephox-snooker-resizer-rows ephox-snooker-resizer-bar"
  // 			style="position: absolute; left: 5px; top: 897.875px; height: 7px; width: 772px;"
  // 		></div>
  // 		<div
  // 			data-row="1"
  // 			role="presentation"
  // 			class="ephox-snooker-resizer-rows ephox-snooker-resizer-bar"
  // 			style="position: absolute; left: 5px; top: 979.875px; height: 7px; width: 772px;"
  // 		></div>
  // 		<div
  // 			data-column="0"
  // 			role="presentation"
  // 			class="ephox-snooker-resizer-cols ephox-snooker-resizer-bar"
  // 			style="position: absolute; left: 773.5px; top: 141.984px; height: 841.391px; width: 7px;"
  // 		></div>
  // 	</html>
  // `;

  const data = fs.readFileSync(
    path.resolve(process.cwd(), "test.html"),
    "utf8"
  );
  console.log(url);
  // console.log(data);
  return data
    .replace("$title", title)
    .replace("$url", url)
    .replace("$body", body);
};

module.exports = { emailTemplate };
