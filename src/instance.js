// @ts-check
"use strict";

// @ts-ignore
const glMatrix = globalThis.glMatrix;

class RibbonTrail {
    constructor(maxPoints, startWidth, endWidth, growthRate = 1) {
        this.maxPoints = maxPoints;
        this.startWidth = startWidth;
        this.endWidth = endWidth;
        this.growthRate = growthRate;
        this.points = [];
        this.quat = glMatrix.quat.create();
        this.position = glMatrix.vec3.create();
    }

    update(position, rotation) {
        glMatrix.vec3.copy(this.position, position);
        glMatrix.quat.copy(this.quat, rotation);

        this.points.unshift({ pos: [...this.position], quat: [...this.quat] });
        if (this.points.length > this.maxPoints) {
            this.points.length = this.maxPoints;
        }
    }

    render(renderer, rcTex) {
        const pointCount = Math.min(
            this.points.length,
            Math.floor(this.growthRate * this.maxPoints)
        );

        console.log(pointCount, this.points);

        const rcSeg = rcTex.clone();

        for (let i = 0; i < pointCount - 1; i++) {
            debugger;
            const t = i / (pointCount - 1);
            const t1 = (i + 1) / (pointCount - 1);
            const width1 = this.endWidth * (1 - t) + this.startWidth * t;
            const width2 =
                this.endWidth * (1 - (t + 1 / (pointCount - 1))) +
                this.startWidth * (t + 1 / (pointCount - 1));
            const halfWidth1 = width1 / 2;
            const halfWidth2 = width2 / 2;

            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            const right1 = glMatrix.vec3.create();
            const right2 = glMatrix.vec3.create();
            glMatrix.vec3.transformQuat(right1, [halfWidth1, 0, 0], p1.quat);
            glMatrix.vec3.transformQuat(right2, [halfWidth2, 0, 0], p2.quat);

            const v1 = glMatrix.vec3.subtract(
                glMatrix.vec3.create(),
                p1.pos,
                right1
            );
            const v2 = glMatrix.vec3.add(
                glMatrix.vec3.create(),
                p1.pos,
                right1
            );
            const v3 = glMatrix.vec3.subtract(
                glMatrix.vec3.create(),
                p2.pos,
                right2
            );
            const v4 = glMatrix.vec3.add(
                glMatrix.vec3.create(),
                p2.pos,
                right2
            );

            const rcWidth = rcTex.getRight() - rcTex.getLeft();
            const left = rcTex.getLeft() + t * rcWidth;
            const right = left + t1 * rcWidth;
            // rcSeg.setLeft(left);
            // rcSeg.setRight(right);
            const rcHeight = rcTex.getBottom() - rcTex.getTop();
            const top = rcTex.getTop() + t * rcHeight;
            const bottom = rcTex.getTop() + t1 * rcHeight;
            rcSeg.setTop(top);
            rcSeg.setBottom(bottom);

            console.log("Top:", top, "Bottom:", bottom);

            renderer.Quad3D(
                v1[0],
                v1[1],
                v1[2],
                v2[0],
                v2[1],
                v2[2],
                v4[0],
                v4[1],
                v4[2],
                v3[0],
                v3[1],
                v3[2],
                rcSeg
            );
        }
    }
}

function getInstanceJs(parentClass, scriptInterface, addonTriggers, C3) {
    return class extends parentClass {
        constructor(inst, properties) {
            // @ts-ignore
            const quat = globalThis.glMatrix.quat;
            super(inst);

            if (properties) {
                this.ribbon = new RibbonTrail(
                    properties[0],
                    properties[1],
                    properties[2],
                    properties[3]
                );
            } else {
                this.ribbon = null;
            }
            this.quaternion = quat.create();
        }

        Draw(renderer) {
            const imageInfo = this._objectClass.GetImageInfo();
            const texture = imageInfo.GetTexture();

            if (!texture) return; // dynamic texture load which hasn't completed yet; can't draw anything
            const rcTex = imageInfo.GetTexRect();

            renderer.SetTexture(texture);

            // @ts-ignore
            const glMatrix = globalThis.glMatrix;
            const vec3 = glMatrix.vec3;
            const quat = glMatrix.quat;
            const wi = this._inst.GetWorldInfo();
            const x = wi.GetX();
            const y = wi.GetY();
            const z = wi.GetTotalZElevation();
            const pos = vec3.fromValues(x, y, z);
            if (this.ribbon) {
                this.ribbon.update(pos, this.quaternion);
                this.ribbon.render(renderer, rcTex);
            }
        }

        _UpdateQuaternion(quaternion) {
            const quat = glMatrix.quat;
            const qValues = JSON.parse(quaternion);
            quat.set(
                this.quaternion,
                qValues[0],
                qValues[1],
                qValues[2],
                qValues[3]
            );
        }

        SaveToJson() {
            return {
                // data to be saved for savegames
            };
        }

        LoadFromJson(o) {
            // load state for savegames
        }
    };
}
