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
        this.quadPoints = [];
        this.quat = glMatrix.quat.create();
        this.position = glMatrix.vec3.create();
    }

    update(position, rotation) {
        glMatrix.vec3.copy(this.position, position);
        glMatrix.quat.copy(this.quat, rotation);

        const newPoint = { pos: [...this.position], quat: [...this.quat] };
        this.points.unshift(newPoint);
        if (this.points.length > this.maxPoints) {
            this.points.pop();
        }

        // Calculate new head point
        const width = this.startWidth;
        const halfWidth = width / 2;
        const right = glMatrix.vec3.create();
        glMatrix.vec3.transformQuat(right, [halfWidth, 0, 0], this.quat);

        const v1 = glMatrix.vec3.subtract(
            glMatrix.vec3.create(),
            this.position,
            right
        );
        const v2 = glMatrix.vec3.add(
            glMatrix.vec3.create(),
            this.position,
            right
        );

        // Add new quad points at the beginning
        this.quadPoints.unshift([v1, v2]);
        if (this.quadPoints.length > this.maxPoints) {
            this.quadPoints.pop();
        }
    }

    render(renderer, rcTex, z) {
        const pointCount = Math.min(
            this.quadPoints.length,
            Math.floor(this.growthRate * this.maxPoints)
        );

        const rcSeg = rcTex.clone();

        for (let i = 0; i < pointCount - 1; i++) {
            const t = i / (pointCount - 1);
            const t1 = (i + 1) / (pointCount - 1);

            const [v1, v2] = this.quadPoints[i];
            const [v3, v4] = this.quadPoints[i + 1];

            const rcHeight = rcTex.getBottom() - rcTex.getTop();
            const top = rcTex.getTop() + t * rcHeight;
            const bottom = rcTex.getTop() + t1 * rcHeight;
            rcSeg.setTop(top);
            rcSeg.setBottom(bottom);

            renderer.Quad3D(
                v1[0],
                v1[1],
                v1[2] - z,
                v2[0],
                v2[1],
                v2[2] - z,
                v4[0],
                v4[1],
                v4[2] - z,
                v3[0],
                v3[1],
                v3[2] - z,
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
                this.ribbon.render(renderer, rcTex, z);
            }
            wi.SetBboxChanged();
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
